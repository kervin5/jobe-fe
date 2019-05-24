import React from 'react';
import { mount } from 'enzyme';
import JobListing from '../../../components/jobs/JobListing/JobListing';


describe('<JobListing />', () => {
  it('renders Title property', () => {
    const mockTitle = "This is a job title";
    const wrapper = mount(<JobListing title={mockTitle} />);
    // console.log(wrapper.find({ prop: 'title' }));
    // expect(wrapper.find({ prop: 'title' })).to.have.lengthOf(1);
    // expect(wrapper.prop('title')).to.equal(mockTitle);
  });
});