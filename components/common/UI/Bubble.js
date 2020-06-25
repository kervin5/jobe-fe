import React from "react";
import variables from "@/common/globalVariables";

const bubble = props => {
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
    <span>
      {props.children}
      <style jsx>{`
        span {
          font-weight: bold;
          font-size: 0.9em;
          text-align: center;
          padding: 4px 8px;

          background-color: ${backgroundColor};
          margin-left: 5px;
          margin-bottom: 5px;
          border-radius: 15px;
          color: ${props.fontColor === "dark"
            ? variables.darkColor
            : variables.clearColor};
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }

        span:first-child {
          margin-left: 0px;
        }

        @media (min-width: 800px) {
          span {
            min-width: 85px;
          }
        }
      `}</style>
    </span>
  );
};

export default bubble;
