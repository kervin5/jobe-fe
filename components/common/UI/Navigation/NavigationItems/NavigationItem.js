import React from "react";
import Link from "next/link";
import variables from "../../../globalVariables";
// import classes from './NavigationItem.module.scss';

const navigationItem = props => {
  return (
    <Link href={props.href || "#"}>
      <a>
        <div>{props.children}</div>
        <style jsx>{`
          div {
            background-color: transparent;
            height: 100%;
            transition: 250ms;

            padding-left: 20px;
            padding-right: 20px;
            padding-top: 15px;
            transition-timing-function: ease-in-out;
            border-bottom: 5px solid transparent;
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: ${variables.baseTextColor};
          }

          div:hover {
            background-color: white;
            border-bottom: 5px solid orangered;
          }
        `}</style>
      </a>
    </Link>
  );
};

export default navigationItem;
