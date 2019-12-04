import React from "react";
import variables from "../globalVariables";
// import classes from './Card.module.scss';

const card = props => {
  return (
    <div className="Card">
      {props.children}
      <style jsx>{`
        .Card {
          position: relative;
          box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.15);
          padding: 10px;
          border-radius: 5px;
          background: ${props.withBackground
            ? variables.clearColor
            : "transparent"};
          ${props.styles || ""}
        }
      `}</style>
    </div>
  );
};

export default card;
