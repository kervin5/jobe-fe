import { useState, useEffect } from "react";
import variables from "../../globalVariables";
import PropTypes from "prop-types";

/**
 * This component renders a side menu
 *
 * @param {Object} props
 * @returns {JSX.Element}
 */

const sideDrawer = props => {
  console.log(props.show);
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
          top: 0;
          bottom: 0;
          z-index: 999;
          padding: 20px;
          transition: 300ms;
          max-width: 350px;
        }

        .SideDrawer.Hidden {
          width: 0;
          padding: 0;
        }

        .CloseBtn {
          font-weight: bold;
          position: absolute;
          right: 30px;
          top: 8px;
          font-size: 2em;
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
