import React from "react";
import styled from "styled-components";

const StyledFlexDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Flex = (props) => {
  const { children } = props;
  return <StyledFlexDiv {...props}>{children}</StyledFlexDiv>;
};

export default Flex;
