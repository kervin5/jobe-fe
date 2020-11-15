import React from "react";
import styled from "styled-components";
import variables from "@/common/globalVariables";

const StyledBubble = styled.span`
  font-weight: bold;
  font-size: 0.9em;
  text-align: center;
  padding: 8px;

  background-color: ${(props) => props.backgroundColor};
  margin-left: 5px;
  margin-bottom: 5px;
  border-radius: 15px;
  color: ${(props) =>
    props.fontColor === "dark" ? variables.darkColor : variables.lightColor};
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:first-child {
    margin-left: 0px;
  }

  @media (min-width: 800px) {
    min-width: 85px;
  }
`;

const bubble = (props) => {
  let backgroundColor = variables.accentColor1;

  if (props.color) {
    if (props.color === "2") {
      backgroundColor = variables.accentColor3;
    } else if (props.color === "3") {
      backgroundColor = variables.accentColor2;
    } else if (props.color === "4") {
      backgroundColor = variables.accentColor4;
    } else {
      backgroundColor = variables.accentColor1;
    }
  }

  return (
    <StyledBubble
      backgroundColor={backgroundColor}
      fontColor={props?.propsColor}
    >
      {props.children}
    </StyledBubble>
  );
};

export default bubble;
