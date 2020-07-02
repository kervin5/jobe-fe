import React from "react";
import { shallow } from "enzyme";
import Title from "@/common/UI/Title";
import { findByTestAttr } from "../../../../testUtils/testUtils";

const WrapperComponent = Title;
const defaultProps = { title: "" };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<WrapperComponent {...setupProps} />);
};

describe("Title component", () => {
  it("renders withour error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "title-component");
    expect(component.length).toBe(1);
  });

  it("renders the title children prop", () => {
    const wrapper = setup({ children: "This is a job title" });
    const component = findByTestAttr(wrapper, "title-text");
    expect(component.length).not.toBe(0);
  });

  it("the text is ", () => {
    const jobTitle = "This is a job title";
    const wrapper = setup({ children: jobTitle });
    const component = findByTestAttr(wrapper, "title-text");
    expect(component.text()).toContain(jobTitle);
  });
});
