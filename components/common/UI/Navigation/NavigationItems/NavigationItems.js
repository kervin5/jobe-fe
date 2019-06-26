import React, { useState } from "react";
import Link from "next/link";
import variables from "../../../globalVariables";
// import classes from './NavigationItems.module.scss';
import NavigationItem from "./NavigationItem.js";
import SideDrawer from "../SideDrawer";

const navigationItems = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div>
      <Link href="/jobs">
        <NavigationItem>Search Jobs</NavigationItem>
      </Link>
      <NavigationItem>Profile</NavigationItem>
      <NavigationItem>
        <SideDrawer />
      </NavigationItem>

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
