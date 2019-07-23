import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import variables from "../globalVariables";

const CustomIcon = props => {
  const classes = props.circle ? "Circle" : "";
  const Color = props.color ? "Color" + props.color : "Color1";

  if (props.icon) {
    return (
      <span className={[classes, "Icon", Color].join(" ")}>
        <Icon name={props.icon} />
        <style jsx global>{`
          .Icon .MuiSvgIcon-root {
            color: ${variables.accentColor1};
          }

          .Icon {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .Circle {
            border-radius: 25px;
            min-width: 35px;
            min-height: 35px;

            box-shadow: 0px 1px 5px -2px rgba(0, 0, 0, 0.75);
          }

          .Circle.Color1 {
            background-color: ${variables.accentColor1};
          }

          .Circle.Color2 {
            background-color: ${variables.accentColor2};
          }

          .Circle.Color3 {
            background-color: ${variables.accentColor3};
          }

          .Circle.Color4 {
            background-color: ${variables.darkColor};
          }

          .Circle .MuiSvgIcon-root {
            color: ${variables.clearColor};
          }
        `}</style>
      </span>
    );
  }

  return null;
};

CustomIcon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default React.memo(CustomIcon, (prevProps, nextProps) => {
  return prevProps.icon === nextProps.icon;
});
