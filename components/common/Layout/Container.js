import React from "react";
import bottomNav from "../UI/Navigation/BottomNav";
// import classes from './Container.module.scss';
import BottomNav from "../UI/Navigation/BottomNav";
const container = props => {
  // const customWidth = props.maxWidth || "900px";

  return (
    <div>
      {props.children}
      <BottomNav />
      <style jsx>{`
        div {
          margin: 0 auto;
          max-width: ${props.maxWidth || "970px"};
          width: 100%;
          padding: 15px;
          ${props.styles || ""};
        }
      `}</style>
    </div>
  );
};

export default container;
