import React from "react";
import variables from "@/common/globalVariables";
// import classes from './Title.modules.scss';

const Title = props => {
  const extraStyles = props.styles || "";
  const alignment = props.center ? "Center" : props.right ? "Right" : "Left";
  const classesToRender = ["Title", alignment].join(" ");
  const weight = props.weight || "bold";
  const textTransform = props.capitalize ? "capitalize" : "inherit";

  const color =
    props.color && variables["accentColor" + props.color]
      ? variables["accentColor" + props.color]
      : variables.darkColor;

  return (
    <div className={classesToRender} data-test="title-component">
      {titleGenerator(props.size, props.children, weight, props)}
      <style jsx>{`
        .Title {
          color: ${color};
          position: relative;
          margin: ${props.nomargin
            ? "0px"
            : props.margin
            ? "20px"
            : "0 0 10px"};
          display: ${props.inline ? "inline-block" : "block"};
          text-transform: ${textTransform};
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

const titleGenerator = (size, text, weight, props) => {
  let TagForTitle = "h1";

  switch (size) {
    case "xs":
      TagForTitle = "h5";
      break;
    case "s":
      TagForTitle = "h4";
      break;
    case "m":
      TagForTitle = "h3";
      break;
    case "l":
      TagForTitle = "h2";
      break;
    default:
      TagForTitle = "h1";
  }

  return (
    <TagForTitle style={{ fontWeight: weight }} data-test="title-text">
      {text}
    </TagForTitle>
  );
};
export default Title;
