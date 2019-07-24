import React, { useState } from "react";
// import classes from './NavigationItems.module.scss';
import NavigationItem from "./NavigationItem.js";

const navigationItems = () => {
  // const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div>
      <NavigationItem href="/">Search Jobs</NavigationItem>
      <NavigationItem href={"/user/login"}>Log In</NavigationItem>
      <NavigationItem href={"/user/register"}>Register</NavigationItem>
      <NavigationItem href={"/dashboard"}>Dashboard</NavigationItem>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          vertical-align: middle;
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

export default React.memo(navigationItems);
