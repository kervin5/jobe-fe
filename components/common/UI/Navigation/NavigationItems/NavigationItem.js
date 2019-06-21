import React from "react";
import { tsPropertySignature } from "@babel/types";
// import classes from './NavigationItem.module.scss';

const navigationItem = props => {
  return (
    <div>
      {props.children}
      <style jsx>{`
        div {
          background-color: transparent;
          height: 100%;
          transition: 250ms;

          padding-left: 20px;
          padding-right: 20px;
          padding-top: 15px;
          transition-timing-function: ease-in-out;
        }

        div:hover {
          background-color: white;
          border-bottom: 5px solid orangered;
        }
      `}</style>
    </div>
  );
};

export default navigationItem;
