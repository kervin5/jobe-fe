import React from "react";

// import classes from './Container.module.scss';

const container = props => {
  // const customWidth = props.maxWidth || "900px";

  return (
    <div className="Container">
      {props.children}
      <style jsx>{`
        .Container {
          margin: 0 auto;
          max-width: ${props.maxWidth || "970px"};
          width: 100%;
          padding: ${props.nopadding
            ? "0px"
            : props.padding
            ? props.padding
            : "15px"};
          padding-top: 15px;
          ${props.styles || ""};
        }
      `}</style>
    </div>
  );
};

export default container;
