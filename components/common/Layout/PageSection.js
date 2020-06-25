import React from "react";
import variables from "@/common/globalVariables";

const pageSection = props => {
  const fullHeight = props.fullHeight ? "min-height: 100vh !important;" : "";
  const extraStyles = props.styles ? props.styles : "";
  return (
    // <div className={classes.PageSection + " " +extraClasses}>
    <div className="PageSection">
      {props.children}
      <style jsx>{`
        .PageSection {
          min-height: 100vh;
          padding-top: ${props.nopadding ? "0px" : "30px"};
          width: 100%;
          position: relative;
          display: flex;
          justify-content: ${props.column ? "start" : "center"};
          align-items: ${!props.center ? "baseline" : "center"};

          flex-direction: ${props.column ? "column" : "row"};
          background-color: ${variables.mutedColor1};
          max-width: ${props.maxWidth || "100%"};
          margin: 0 auto;
          ${fullHeight}
          ${extraStyles}
        }

        .PageSection:first-child {
          min-height: calc(100vh - 50px);
        }

        @media (max-width: 720px) {
          .PageSection:first-child {
            min-height: calc(100vh - 88px);
          }
        }
      `}</style>
    </div>
  );
};

export default pageSection;
