import PropTypes from "prop-types";
import Icon from "./Icon";
import variables from "../globalVariables";

const Button = props => {
  const height = props.size ? props.size.height : variables.inputHeight;
  const iconOnly = props.iconOnly ? "IconOnly" : "";
  const customColor =
    "background-color: " +
    (props.color
      ? variables["accentColor" + props.color]
      : variables.accentColor1 + ";");

  return (
    <button onClick={props.click} className={["Button", iconOnly].join(" ")}>
      {props.icon ? <Icon icon={props.icon} /> : null}
      {props.iconOnly ? null : props.children}
      <style jsx>{`
        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
          font-family: "Arial";
        }

        a:hover {
          opacity: 0.6;
        }

        .Button {
          height: ${height};
          border-radius: ${variables.roundedRadius};

          border: none;
          color: ${variables.clearColor};
          box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.66);
          transition: 300ms;
          min-width: 100px;
          padding-left: 10px;
          padding-right: 10px;
          width: ${props.fullWidth ? "100%" : "auto"};
          ${customColor}
        }

        .Button:hover {
          background-color: ${variables.accentColor3};
          cursor: pointer;
        }

        .Button :global(svg) {
          margin-right: 10px;
          opacity: 0.8;
          height: 15px;
        }

        .IconOnly {
          width: 40px;
          height: 40px;
          min-width: 0px;
          padding-left: 0;
          padding-right: 0;
        }

        .IconOnly :global(svg) {
          margin-right: 0;
        }

        ${props.styles || ""}
      `}</style>
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.object,
  icon: PropTypes.string,
  color: PropTypes.string
};

export default Button;
