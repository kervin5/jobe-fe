import React, { useState } from "react";
import { Link } from "../../../../../routes";
import variables from "../../../globalVariables";
// import classes from './NavigationItems.module.scss';
import NavigationItem from "./NavigationItem.js";

const navigationItems = () => {
  // const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div>
      <Link route="/">
        <a>
          <NavigationItem>Search Jobs</NavigationItem>
        </a>
      </Link>

      <Link route={"/users/login"}>
        <a>
          <NavigationItem>Log In</NavigationItem>
        </a>
      </Link>

      <Link route={"/users/register"}>
        <a>
          <NavigationItem>Register</NavigationItem>
        </a>
      </Link>

      {/* <Link route={"/dashboard"}>
        <a>
          <NavigationItem>Jane Doe</NavigationItem>          
        </a>
      </Link> */}

      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          vertical-align: middle;
        }

        a {
          text-decoration: none;
          color: ${variables.baseTextColor};
        }

        @media (max-width: 900px) {
          div {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default navigationItems;
