import React from "react";
import variables from "@/common/globalVariables";

const HamburgerMenu = props => {
  const handleClick = e => {
    e.preventDefault();
    if (props.onChange) {
      props.onChange(!props.open);
    }
  };

  return (
    <div
      className={"HamburgerMenu " + (props.open ? "Open" : "")}
      onClick={handleClick}
    >
      <span />
      <span />
      <span />
      <style jsx>{`
        .HamburgerMenu {
          position: fixed;
          top: 12px;
          right: 20px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }

        .HamburgerMenu span {
          display: block;
          width: 35px;
          height: 4px;
          background-color: ${variables.accentColor2};
          border-radius: 5px;
          margin-bottom: 5px;
          transition: 200ms;
        }

        .HamburgerMenu.Open span:nth-child(2) {
          transform: rotate(45deg) scale(0.6);
        }

        .HamburgerMenu.Open span:nth-child(1) {
          transform: rotate(135deg) translate(8px, -5px) scale(0.6);
        }

        .HamburgerMenu.Open span:nth-child(3) {
          display: none;
        }

        @media (min-width: 900px) {
          .HamburgerMenu {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default HamburgerMenu;
