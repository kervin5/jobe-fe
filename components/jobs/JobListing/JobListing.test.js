import React from 'react';
import { mount } from 'enzyme';
import JobListing from './JobListing';
import JobListingDescription from './JobListingDescription/JobListingDescription';

describe('<JobListing />', () => {
  it('Renders the description of the job', () => {
    const mockTitle = 'This is a mock title';
    const wrapper = mount(<JobListing title={mockTitle} />);
    expect(wrapper.find(JobListingDescription)).toHaveLength(1);
  });
});