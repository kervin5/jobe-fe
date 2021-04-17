import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  &.Card {
    position: relative;
    box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.15);
    padding: 10px;
    border-radius: 5px;
    background: ${(props) =>
      props.withBackground ? props.theme.lightColor : "transparent"};
    ${(props) => props.styles ?? ""}
  }
`;

const card = (props) => {
  return (
    <StyledCard className="Card" {...props}>
      {props.children}
    </StyledCard>
  );
};

export default card;
