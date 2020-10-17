import React from "react";
import variables from "@/common/globalVariables";
import styled from "styled-components";

const StyledPageSection = styled.div`
  &.PageSection {
    min-height: 100vh;
    padding-top: ${(props) => (props.nopadding ? "0px" : "30px")};
    width: 100%;
    position: relative;
    display: flex;
    justify-content: ${(props) => (props.column ? "start" : "center")};
    align-items: ${(props) => (!props.center ? "baseline" : "center")};

    flex-direction: ${(props) => (props.column ? "column" : "row")};
    background-color: ${(props) => props.theme.colors.mutedColor1};
    max-width: ${(props) => props.maxWidth || "100%"};
    margin: 0 auto;
    min-height: ${(props) => (props.fullHeight ? "100vh !important" : "auto")};
  }

  .PageSection:first-child {
    min-height: calc(100vh - 50px);
  }

  @media (max-width: 720px) {
    .PageSection:first-child {
      min-height: calc(100vh - 88px);
    }
  }
`;

const pageSection = (props) => {
  return (
    // <div className={classes.PageSection + " " +extraClasses}>
    <div className="PageSection" {...props}>
      {props.children}
      <style jsx>{``}</style>
    </div>
  );
};

export default pageSection;
