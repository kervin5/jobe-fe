import React from "react";
import variables from "../globalVariables";
// import classes from './Title.modules.scss';

const Title = props => {
  const extraStyles = props.styles || "";
  const alignment = props.center ? "Center" : props.right ? "Right" : "Left";
  const classesToRender = ["Title", alignment].join(" ");
  const weight = props.weight || "bold";
  return (
    <div className={classesToRender} data-test="title-component">
      {titleGenerator(props.size, props.children, weight)}
      <style jsx>{`
        .Title {
          color: ${variables.darkColor};
          position: relative;
          margin-bottom: 10px;
          ${extraStyles};
        }

        .Left {
          text-align: left;
        }

        .Center {
          text-align: center;
        }

        .Right {
          text-align: right;
        }
      `}</style>
    </div>
  );
};

const titleGenerator = (size, text, weight) => {
  switch (size) {
    case "s":
      return (
        <h5 style={{ fontWeight: weight }} data-test="title-text">
          {text}
        </h5>
      );
    case "m":
      return (
        <h3 style={{ fontWeight: weight }} data-test="title-text">
          {text}
        </h3>
      );
    case "l":
      return (
        <h2 style={{ fontWeight: weight }} data-test="title-text">
          {text}
        </h2>
      );
    default:
      return (
        <h1
          style={{ fontWeight: weight, fontSize: "2.5em" }}
          data-test="title-text"
        >
          {text}
        </h1>
      );
  }
};
export default Title;
