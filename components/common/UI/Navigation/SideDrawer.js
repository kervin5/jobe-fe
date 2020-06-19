import variables from "../../globalVariables";
import PropTypes from "prop-types";

/**
 * This component renders a side menu
 *
 * @param {Object} props
 * @returns {JSX.Element}
 */

const sideDrawer = props => {
  return (
    <div className={"SideDrawer " + (props.show ? "" : "Hidden")}>
      <p onClick={props.close} className="CloseBtn">
        &times;
      </p>
      {props.children}
      <style jsx>{`
        .SideDrawer {
          height: 100vh;
          width: 94%;
          background-color: ${variables.clearColor};
          overflow-x: scroll;
          position: fixed;
          top: 50px;
          bottom: 0;
          z-index: 999;
          padding: 20px;
          transition: 300ms;
          max-width: 350px;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
        }

        .SideDrawer.Hidden {
          width: 0;
          padding: 0;
        }

        .CloseBtn {
          font-weight: bold;
          position: absolute;
          right: 30px;
          top: 30px;
          font-size: 2em;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

sideDrawer.propTypes = {
  show: PropTypes.bool
};

export default React.memo(
  sideDrawer,
  (prevProps, nexProps) => nexProps.show === prevProps.show
);
