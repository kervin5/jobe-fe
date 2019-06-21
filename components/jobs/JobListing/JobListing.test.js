import React from "react";
import { mount } from "enzyme";
import JobListing from "./JobListing";
import JobListingContentBlock from "./JobListingContentBlock/JobListingContentBlock";

describe("<JobListing />", () => {
  it("Renders the description of the job", () => {
    const mockTitle = "This is a mock title";
    const wrapper = mount(<JobListing title={mockTitle} />);
    expect(wrapper.find(JobListingContentBlock)).toHaveLength(2);
  });
});
