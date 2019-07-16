import React from 'react';
import {shallow} from 'enzyme';
import PostPreview from '../components/PostPreview';

describe("<PostPreview/>", ()=> {
    it("Simple Render Works",()=>{
        const component=shallow(<PostPreview/>);
        expect(component).toMatchSnapshot();
    })

    it("Render with props Works",()=>{
        const component=shallow(<PostPreview _id={"43982472982"} title={"post prueba"} />);
        expect(component.find('.post-title').text()).toBe("post prueba");
    })
})