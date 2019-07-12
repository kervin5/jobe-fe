import React from "react";
import { shallow } from "enzyme";
import JobListing from "../../../../components/jobs/JobListing/JobListing";
import { findByTestAttr } from "../../../../testUtils/testUtils";

const WrapperComponent = JobListing;
const defaultProps = { success: false };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<WrapperComponent {...setupProps} />);
};

describe("JobListing component", () => {
  it("renders withour error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "job-listing");
    expect(component.length).toBe(1);
  });

  it("has a section for the title", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "title-section");
    expect(component.length).toBe(1);
  });

  it("has a section for the main content", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "main-content-section");
    expect(component.length).toBe(1);
  });

  it("has a section for the company information", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "company-information-section");
    expect(component.length).toBe(1);
  });

  it("has apply Button", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "appy-button");
    expect(component.length).toBe(1);
  });
});
