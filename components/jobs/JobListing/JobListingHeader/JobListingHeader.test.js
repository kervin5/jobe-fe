import React from "react";
import { mount } from "enzyme";
import JobListingHeader from "./JobListingHeader";
import Title from "../../../common/UI/Title";

describe("<JobListingHeaderHeader />", () => {
  it("renders the job title property", () => {
    const mockTitle = "This is a job title";
    const wrapper = mount(<JobListingHeader title={mockTitle} />);
    expect(
      wrapper
        .find(Title)
        .first()
        .text()
    ).toEqual(mockTitle);
  });

  it("renders the job location property", () => {
    const mockLocation = "This is a mock location";
    const wrapper = mount(<JobListingHeader location={mockLocation} />);
    expect(
      wrapper
        .find(Title)
        .last()
        .text()
    ).toEqual(" " + mockLocation);
  });
});
