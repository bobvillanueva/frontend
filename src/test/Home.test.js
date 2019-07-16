import React from 'react';
import {act} from 'react-dom/test-utils'
import {mount} from 'enzyme';
import ApolloProvider from 'react-apollo-hooks';
import {BrowserRouter as Router} from 'react-router-dom';
import createClient from './mockClient';
import gql from 'graphql-tag';
import Home from '../views/Home';
import {resolve} from 'dns';


const ALL_POST=gql`
query ALLPOST{
    listPosts{
            _id,
            title
    }
}
`

const ALL_POST_MOCK=[
    {
        request:{
            query: ALL_POST
        },
        result:{
            data:{
                listPosts:[
                    {_id:"53453453",title:"Post 1"},
                    {_id:"53453454",title:"Post 2"},
                    {_id:"53453455",title:"Post 3"}
                ]
            }
        }
    }
]

const waitRequest=()=> new Promise(resolve=> setTimeout(resolve));

describe("<Home />",()=>{
    it("Render Works",()=>{
        const client= createClient(ALL_POST_MOCK)
        const component =mount(
        <ApolloProvider client={client}>
            <Router>
                <Home/>
            </Router>
            
        </ApolloProvider>
        );
        expect(component).toMatchShapshot();
    })

    it("Render Post works",()=>{
        act(()=>{
            const testRequest=async()=>{
                const client= createClient(ALL_POST_MOCK)
                await waitRequest();
                const component =mount(
                <ApolloProvider client={client}>
                    <Router>
                        <Home/>
                    </Router>
                    
                </ApolloProvider>
                );
                 expect(component.find(".post-title")).toHaveLength(3);
              

            }
            testRequest();
        })
           
             //expect(component.find('h4').text()).toBe("Loading...");
        })
      
       

})