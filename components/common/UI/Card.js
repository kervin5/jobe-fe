import React from "react";
// import classes from './Card.module.scss';

const card = props => {
  const animateHover = props.animate ? "1.05" : "1";

  return (
    <div className="Card">
      {props.children}
      <style jsx>{`
        .Card {
          position: relative;
          box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.15);
          padding: 10px;
          border-radius: 5px;
          ${props.styles || ""}
        }

        .Card:hover {
          transform: scale(${animateHover});
        }
      `}</style>
    </div>
  );
};

export default card;
