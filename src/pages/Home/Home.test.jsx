import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home'
describe('Simulation', () => {
    describe('Render component', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper).toMatchSnapshot();
    });
    
});