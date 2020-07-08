import React from "react";
import Link from "next/link";
import styled from "styled-components";
import variables from "@/common/globalVariables";

const StyledNavigationItem = styled.a`
  &:hover {
    cursor: pointer;
  }
  .NavigationItemContent {
    background-color: transparent;
    height: 100%;
    transition: 250ms;

    padding-left: 20px;
    padding-right: 20px;
    padding-top: 15px;
    padding-bottom: 15px;
    transition-timing-function: ease-in-out;
    border-bottom: 5px solid transparent;
    font-weight: bold;

    &:hover {
      background-color: white;
      border-bottom: 5px solid orangered;
    }
  }

  &.NavigationItem {
    text-decoration: none;
    color: ${variables.baseTextColor};
    text-transform: capitalize;
  }
`;

const navigationItem = (props) => {
  return (
    <Link href={props.href || "#"}>
      <StyledNavigationItem className="NavigationItem">
        <div className="NavigationItemContent">{props.children}</div>
      </StyledNavigationItem>
    </Link>
  );
};

export default navigationItem;
