import React from 'react';
import { mount } from 'enzyme';
import JobListing from './JobListing';


describe('<JobListing />', () => {
  it('uses the title prop', () => {
    const mockTitle = 'This is a mock title';
    const wrapper = mount(<JobListing title={mockTitle} />);
    expect(wrapper.find({title: mockTitle})).toHaveLength(1);
  });

  it("uses the 'description' prop", () => {
    const mockDescription = 'This is a mock description';
  
    const wrapper = mount(<JobListing description={mockDescription} />);
    // console.log(wrapper.find({description: mockDescription}).children());
    expect(wrapper.find({description: mockDescription})).toHaveLength(2);
  });

});