import React from "react";
import styled from "styled-components";
// import classes from './Title.modules.scss';

const StyledTitle = styled.div`
  color: ${(props) =>
    props.color && props.theme?.["accentColor" + props.color]
      ? props.theme["accentColor" + props.color]
      : props.theme.darkColor};
  position: relative;
  margin: ${(props) =>
    props.nomargin ? "0px" : props.margin ? "20px" : "30px 0"};
  display: ${(props) => (props.inline ? "inline-block" : "block")};
  text-transform: ${(props) => props.textTransform};
  font-weight: ${(props) => props.weight};

  &.Left {
    text-align: left;
  }

  &.Center {
    text-align: center;
  }

  &.Right {
    text-align: right;
  }

  &.Level1 {
    font-size: 2.6em;
  }

  &.Level2 {
    font-size: 2.3em;
  }

  &.Level3 {
    font-size: 2em;
  }

  &.Level4 {
    font-size: 1.7em;
  }

  &.Level5 {
    font-size: 1.4em;
  }

  @media (max-width: 720px) {
    &.Level1 {
      font-size: 1em;
    }

    &.Level2 {
      font-size: 2.3em;
    }

    &.Level3 {
      font-size: 2em;
    }

    &.Level4 {
      font-size: 1.7em;
    }

    &.Level5 {
      font-size: 1.4em;
    }
  }
`;

const Title = (props) => {
  const alignment = props.center ? "Center" : props.right ? "Right" : "Left";
  const classesToRender = ["Title", alignment].join(" ");
  const weight = props.weight || "bold";
  const textTransform = props.capitalize ? "capitalize" : "inherit";
  const fontLevel = props.level ? `Level${props.level}` : `Level1`;

  return (
    <StyledTitle
      className={`${classesToRender} ${props.className ?? ""} ${fontLevel}`}
      color={props.color}
      textTransform={textTransform}
      weight={weight}
      nomargin={props.nomargin}
    >
      {titleGenerator(props.level, props.children)}
    </StyledTitle>
  );
};

const titleGenerator = (level, text) => {
  let TagForTitle = "h1";

  switch (level) {
    case 5:
      TagForTitle = "h5";
      break;
    case 4:
      TagForTitle = "h4";
      break;
    case 3:
      TagForTitle = "h3";
      break;
    case 2:
      TagForTitle = "h2";
      break;
    default:
      TagForTitle = "h1";
  }

  return <TagForTitle>{text}</TagForTitle>;
};
export default Title;
