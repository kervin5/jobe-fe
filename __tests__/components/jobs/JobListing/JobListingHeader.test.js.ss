import React from "react";
import { shallow } from "enzyme";
import JobListingHeader from "../../../../components/jobs/JobListing/JobListingHeader/JobListingHeader";
import { findByTestAttr } from "../../../../testUtils/testUtils";

const WrapperComponent = JobListingHeader;
const defaultProps = { success: false };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<WrapperComponent {...setupProps} />);
};

describe("JobListingHeader component", () => {
  it("renders withour error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "job-listing-header");
    expect(component.length).toBe(1);
  });

  it("has a section for the title", () => {
    const wrapper = setup({ title: "This is a job title" });
    const component = findByTestAttr(wrapper, "title-section");
    expect(component.length).not.toBe(0);
  });

  it("has a section for the location", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "location-section");
    expect(component.length).not.toBe(0);
  });
});
