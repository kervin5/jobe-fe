import React, { useState } from "react";
import NavigationItem from "./NavigationItem.js";
import LogoutButton from "../../LogoutButton";
import RenderIfLoggedIn from "../../../../hoc/RenderIfLoggedIn";
import RenderIfLoggedOut from "../../../../hoc/RenderIfLoggedOut";

const navigationItems = () => {
  // const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div>
      <NavigationItem href="/">Search Jobs</NavigationItem>
      <RenderIfLoggedOut>
        <NavigationItem href={"/user/login"}>Log In</NavigationItem>
        <NavigationItem href={"/user/register"}>Register</NavigationItem>
      </RenderIfLoggedOut>
      <RenderIfLoggedIn>
        <NavigationItem href={"/dashboard"}>Dashboard</NavigationItem>
        <NavigationItem href={"/me"}>Me</NavigationItem>
        <LogoutButton />
      </RenderIfLoggedIn>
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
