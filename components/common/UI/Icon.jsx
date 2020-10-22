import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";

const StyledIcon = styled.span`
  &.Icon {
    i {
      color: ${(props) => props.theme.accentColor1};
      width: auto;
      height: auto;
      margin: 0;
    }
  }

  &.Circle {
    border-radius: 25px;
    min-width: 35px;
    min-height: 35px;
    display: inline-block;
    box-shadow: 0px 1px 5px -2px rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;

    &.Color1 {
      background-color: ${(props) => props.theme.accentColor1};
    }

    &.Color2 {
      background-color: ${(props) => props.theme.accentColor2};
    }

    &.Color3 {
      background-color: ${(props) => props.theme.accentColor3};
    }

    &.Color4 {
      background-color: ${(props) => props.theme.darkColor};
    }

    i {
      color: ${(props) => props.theme.lightColor};
    }
  }
`;

const CustomIcon = (props) => {
  const classes = props.circle ? "Circle" : "";
  const Color = props.color ? "Color" + props.color : "Color1";

  if (props.icon) {
    return (
      <StyledIcon
        className={[
          classes,
          "Icon",
          Color,
          props.className ? props.className : "",
        ].join(" ")}
      >
        <Icon>{props.icon}</Icon>
      </StyledIcon>
    );
  }

  return null;
};

CustomIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default React.memo(CustomIcon, (prevProps, nextProps) => {
  return prevProps.icon === nextProps.icon;
});
