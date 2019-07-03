import React, { useState } from "react";
import { Link } from "../../../../../routes";
import variables from "../../../globalVariables";
// import classes from './NavigationItems.module.scss';
import NavigationItem from "./NavigationItem.js";
import Button from "@material-ui/core/Button";

const navigationItems = () => {
  // const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div>
      <Button>
        <Link route={"/user/login"}>
          <a>Log In</a>
        </Link>
      </Button>

      <Button>
        <Link route={"/user/register"}>
          <a>Register</a>
        </Link>
      </Button>

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
