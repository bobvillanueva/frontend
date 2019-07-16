import React from 'react';
import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';


import useForm from '../hooks/useForm';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Input from '../components/input';
import Button from '../components/button';

const LOGIN=gql`
mutation LOGIN($email:String!,$password:String!){
    login(email:$email,password:$password){
        token
    }
}

`

function Login({history}){
    const [sendLogin]=useMutation(LOGIN);

    const submitLogin =async(fields)=>{
        const mutation=await sendLogin({variables:{...fields}})
        if(mutation){
            const {login}=mutation.data;
            //console.log(login);
            localStorage.setItem('blogToken',login.token);
            history.push('/');
        }
        console.log(fields);
    }
    const {inputs,handleInputChange,handleSubmit}=useForm(submitLogin)
    return(
        <>
        <Navbar/>
        <Header/>
        <main className="container">
            <section className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                    <form onSubmit={handleSubmit}>
                        
                        <Input name="email"
                        label="email"
                        placeholder="Email"
                        value={inputs.email}
                        onChange={handleInputChange}
                        required
                        />
                        <Input name="password"
                        label="Password"
                        placeholder="Password"
                        type="password"
                        value={inputs.password}
                        onChange={handleInputChange}
                        required
                        />
                        
                     
                        <button type="submit" className="btn btn-primary">Send</button>
                    </form>
                </div>
            </section>
        </main>
        </>
    )
}

export default Login;