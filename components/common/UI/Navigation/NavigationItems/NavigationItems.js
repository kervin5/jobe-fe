import React, { useState } from "react";
import Link from "next/link";
import variables from "../../../globalVariables";
// import classes from './NavigationItems.module.scss';
import NavigationItem from "./NavigationItem.js";
import Button from "@material-ui/core/Button";

const navigationItems = () => {
  // const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div>
      <Link herf="/">
        <a>
          <NavigationItem>Search Jobs</NavigationItem>
        </a>
      </Link>

      <Link herf={"/users/login"}>
        <a>
          <NavigationItem>Log In</NavigationItem>
        </a>
      </Link>

      <Link href={"/users/register"}>
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

        .hamburgerMenu {
          display: none;
        }

        @media (max-width: 900px) {
          div {
            display: none;
          }

          .hamburgerMenu {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default navigationItems;
