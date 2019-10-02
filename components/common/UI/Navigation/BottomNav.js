import React from "react";

import { Icon } from "semantic-ui-react";
import NavigationItem from "./NavigationItems/NavigationItem";
import LogoutButtonMobile from "../LogOutButtonMobile";
import RenderIfLoggedIn from "../../../hoc/RenderIfLoggedIn";
import RenderIfLoggedOut from "../../../hoc/RenderIfLoggedOut";
import variables from "../../globalVariables";

const bottomNav = () => (
  <nav className="BottomNav">
    <NavigationItem href="/">
      <Icon name="search" inverted color="grey" size="large" />
    </NavigationItem>
    <RenderIfLoggedOut>
      <NavigationItem href={"/user/login"}>
        <Icon name="heart" inverted color="grey" size="large" />
      </NavigationItem>
      <NavigationItem href={"/user/register"}>
        <Icon name="user" inverted color="grey" size="large" />
      </NavigationItem>
    </RenderIfLoggedOut>
    <RenderIfLoggedIn permissions={[{ object: "JOB", action: "CREATE" }]}>
      <NavigationItem href={"/dashboard"}>
        <Icon name="dashboard" inverted color="grey" size="large" />
      </NavigationItem>
    </RenderIfLoggedIn>
    <RenderIfLoggedIn
      permissions={[{ object: "APPLICATION", action: "CREATE" }]}
    >
      <NavigationItem href={"/me"}>
        <Icon name="user" inverted color="grey" size="large" />
      </NavigationItem>
    </RenderIfLoggedIn>
    <RenderIfLoggedIn>
      <NavigationItem>
        <LogoutButtonMobile />
      </NavigationItem>
    </RenderIfLoggedIn>
    <style jsx>{`
      .BottomNav {
        display: none;
      }

      .BottomNav :global(.NavigationItem .NavigationItemContent) {
        padding-top: 6px;
        padding-bottom: 6px;
      }

      .BottomNav :global(.NavigationItem i) {
        color: ${variables.clearColor} !important;
      }

      .BottomNav :global(.NavigationItem:hover i) {
        color: ${variables.accentColor3} !important;
      }

      @media (max-width: 900px) {
        .BottomNav {
          display: block;
          background-color: ${variables.accentColor1};
          color: ${variables.clearColor1};
          display: flex;
          justify-content: space-around;
          align-items: baseline;
          align-content: center;
          position: fixed;
          bottom: 0;
          width: 100%;
          z-index: 1999;
        }
      }
    `}</style>
  </nav>
);

export default bottomNav;
