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
          max-width: ${props.maxWidth || "970px"};
          width: 100%;
          padding: ${props.nopadding
            ? "0px"
            : props.padding
            ? props.padding
            : "15px"};
          padding-top: 30px;
          ${props.styles || ""};
        }
      `}</style>
    </div>
  );
};

export default container;
