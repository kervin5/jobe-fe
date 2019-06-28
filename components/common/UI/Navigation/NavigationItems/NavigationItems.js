import React, { useState } from "react";
import Link from "next/link";
import variables from "../../../globalVariables";
// import classes from './NavigationItems.module.scss';
import NavigationItem from "./NavigationItem.js";

const navigationItems = () => {
  // const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div>
      <Link href="/jobs">
        <NavigationItem>Search Jobs</NavigationItem>
      </Link>
      <Link href="/dashboard">
        <NavigationItem>Profile</NavigationItem>
      </Link>

      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
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
