import React, { useState } from "react";

import NavigationItem from "./NavigationItem.js";
import NavigationItemUserMenu from "./NavigationItemUserMenu";
import LogoutButton from "../../LogoutButton";
import RenderIfLoggedIn from "../../../../hoc/RenderIfLoggedIn";
import RenderIfLoggedOut from "../../../../hoc/RenderIfLoggedOut";

import HamburgerMenu from "../HamburgerMenu";
import variables from "../../../globalVariables";

const navigationItems = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HamburgerMenu onChange={setOpen} open={open} />
      <div
        className={"NavigationItems " + (open ? "Open" : "")}
        onClick={() => setOpen(false)}
      >
        <NavigationItem href="/">Search Jobs</NavigationItem>
        <RenderIfLoggedOut>
          <NavigationItem href={"/user/login"}>Log In</NavigationItem>
          <NavigationItem href={"/user/register"}>Register</NavigationItem>
        </RenderIfLoggedOut>
        <RenderIfLoggedIn permissions={[{ object: "JOB", action: "CREATE" }]}>
          <NavigationItem href={"/dashboard"}>Dashboard</NavigationItem>
        </RenderIfLoggedIn>
        <RenderIfLoggedIn>
          <NavigationItemUserMenu />
        </RenderIfLoggedIn>
        <style jsx>{`
          .NavigationItems {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          }

          .NavigationItems :global(.UserNameLink) {
            font-weight: bold;

            background-color: transparent;
            height: 100%;
            transition: 250ms;

            padding-left: 20px;
            padding-right: 20px;
            padding-top: 15px;
            padding-bottom: 15px;
            transition-timing-function: ease-in-out;
            border-bottom: 5px solid transparent;
            font-weight: bold;
          }

          .NavigationItems :global(.UserNameLink .menu) {
            width: 100%;
          }

          .NavigationItems :global(.UserNameLink a) {
            text-decoration: none;
            color: ${variables.baseTextColor};
          }

          .NavigationItems :global(.UserNameLink:hover) {
            background-color: white;
            border-bottom: 5px solid orangered;
          }

          @media (max-width: 900px) {
            .NavigationItems {
              background-color: ${variables.clearColor};
              padding-top: 100px;
              position: fixed;
              flex-direction: column;
              top: 0;
              left: 130vw;
              right: 0;
              bottom: 0;
              z-index: 999;
              font-size: 2em;
              transition: 300ms;
            }

            .NavigationItems.Open {
              left: 0;
            }

            .NavigationItems :global(.NavigationItem) {
              margin-bottom: 30px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default React.memo(navigationItems);
