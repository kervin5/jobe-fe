import { useState } from "react";
import Button from "../Button";
import variables from "../../globalVariables";

const ButtonsBar = props => {
  return (
    <nav>
      <Button iconOnly icon="home" />
      <Button iconOnly icon="briefcase" />
      <Button iconOnly icon="users" />
      <Button iconOnly icon="cog" />
      <style jsx>{`
        nav {
          top: 70px;
          width: 70px;
          padding: 10px;
          left: 10px;
          position: fixed;
          background-color: ${variables.clearColor};
          z-index: 2000;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          border-radius: 15px;
          box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.15);
        }

        nav :global(button) {
          margin-bottom: 10px;
          margin-top: 10px;
        }
      `}</style>
    </nav>
  );
};

export default ButtonsBar;
