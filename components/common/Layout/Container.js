import React from "react";
// import classes from './Container.module.scss';

const container = props => {
  // const customWidth = props.maxWidth || "900px";

  return (
    <div>
      {props.children}
      <style jsx>{`
        div {
          margin: 0 auto;
          max-width: 920px;
          width: 100%;
          padding: 15px;
          ${props.styles || ""};
        }
      `}</style>
    </div>
  );
};

export default container;
