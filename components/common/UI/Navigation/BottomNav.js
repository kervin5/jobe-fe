import React from "react";

import { Icon } from "semantic-ui-react";
import NavigationItem from "./NavigationItems/NavigationItem";
import LogoutButtonMobile from "../LogoutButtonMobile";
import RenderIfLoggedIn from "../../../hoc/RenderIfLoggedIn";
import RenderIfLoggedOut from "../../../hoc/RenderIfLoggedOut";
import variables from "../../globalVariables";

const bottomNav = () => (
  <>
    <nav className="BottomNav">
      <NavigationItem href="/">
        <Icon name="search" inverted color="grey" size="large" />
      </NavigationItem>
      <RenderIfLoggedOut>
        <NavigationItem href={"/user/login"}>
          <Icon name="sign-in" inverted color="grey" size="large" />
        </NavigationItem>
        <NavigationItem href={"/user/register"}>
          <Icon name="wpforms" inverted color="grey" size="large" />
        </NavigationItem>
      </RenderIfLoggedOut>
      <RenderIfLoggedIn access={["ADMIN", "SUPERVISOR", "RECRUITER"]}>
        <NavigationItem href={"/dashboard"}>
          <Icon name="dashboard" inverted color="grey" size="large" />
        </NavigationItem>
      </RenderIfLoggedIn>
      <RenderIfLoggedIn access={["CANDIDATE"]}>
        <NavigationItem href={"/me"}>
          <Icon name="user" inverted color="grey" size="large" />
        </NavigationItem>
      </RenderIfLoggedIn>
      <RenderIfLoggedIn>
        <LogoutButtonMobile />
      </RenderIfLoggedIn>
    </nav>
    <style jsx>{`
      nav {
        position: fixed;
        bottom: 0;
        width: 100%;
      }

      @media (max-width: 900px) {
        .BottomNav {
          margin-top: 20px;
          display: block;
          background-color: ${variables.accentColor1};
          color: ${variables.clearColor};
          display: flex;
          justify-content: space-evenly;
          align-items: baseline;
          align-content: center;
          z-index: 999;
        }

        a:hover {
          background-color: black;
        }
      }
    `}</style>
  </>
);

export default bottomNav;
