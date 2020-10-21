import React from "react";
import DropdownInputSingle from "./DropdownInputSingle";
import DropdownInputMultiple from "./DropdownInputMultiple";

const index = (props) => {
  const { multiple } = props;
  let ComponentToRender = DropdownInputSingle;
  if (multiple) {
    ComponentToRender = DropdownInputMultiple;
  }
  return <ComponentToRender {...props} />;
};

export default index;
