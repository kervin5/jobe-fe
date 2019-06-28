import React from "react";
import { shallow } from "enzyme";
import Index from "../pages/index";
import { findByTestAttr } from "../testUtils/testUtils";

const defaultProps = { success: false };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Index {...setupProps} />);
};

describe("Index Home Page", () => {
  it("renders withour error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "indexPage");
    expect(component.length).toBe(1);
  });
});
