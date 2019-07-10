import PropTypes from "prop-types";
import Icon from "./Icon";
import variables from "../globalVariables";
import CircularProgress from "@material-ui/core/CircularProgress";

const Button = props => {
  const height = props.size ? props.size.height : variables.inputHeight;
  const iconOnly = props.iconOnly ? "IconOnly" : "";
  const disabled = props.disabled ? "Disabled" : "";
  const customColor =
    "background-color: " +
    (props.color
      ? variables["accentColor" + props.color]
      : variables.accentColor1 + ";");

  return (
    <button
      onClick={props.click}
      className={["Button", iconOnly, disabled].join(" ")}
      disabled={props.disabled}
    >
      {props.icon ? <Icon icon={props.icon} /> : null}
      {props.iconOnly ? null : props.loading ? (
        <CircularProgress />
      ) : (
        props.children
      )}
      <style jsx>{`
        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
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
          padding-left: 15px;
          padding-right: 15px;
          width: ${props.fullWidth ? "100%" : "auto"};
          display: flex;
          justify-content: space-around;
          ${customColor}
        }

        .Button:hover {
          background-color: ${variables.accentColor3};
          cursor: pointer;
        }

        .Button :global(.MuiSvgIcon-root) {
          margin-right: 5px;
          opacity: 0.9;
          height: 15px;
          color: ${variables.clearColor};
        }

        .Button :global(.MuiCircularProgress-root) {
          padding: 5px;
        }

        .Button :global(.MuiCircularProgress-root svg) {
          color: ${variables.clearColor};
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

        .Disabled {
          background-color: ${variables.mutedColor1};
          color: ${variables.darkColor};
          box-shadow: none;
        }

        .Disabled:hover {
          background-color: ${variables.mutedColor1};
          cursor: not-allowed;
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
