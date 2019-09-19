import React from "react";

import { Icon } from "semantic-ui-react";
import NavigationItem from "./NavigationItems/NavigationItem";
import LogoutButtonMobile from "../LogOutButtonMobile";
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
          <Icon name="key" inverted color="grey" size="large" />
        </NavigationItem>
        <NavigationItem href={"/user/register"}>
          <Icon
            name="file alternate outline"
            inverted
            color="grey"
            size="large"
          />
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
    </nav>
    <style jsx>{`
      nav {
        display: none;
      }

      @media (max-width: 900px) {
        nav {
          position: fixed;
          bottom: 0;
          width: 100%;
          z-index: 1;
        }

        .BottomNav {
          display: block;
          background-color: ${variables.accentColor1};
          color: ${variables.clearColor};
          display: flex;
          justify-content: space-around;
          align-items: baseline;
          align-content: center;
        }

        a:hover {
          background-color: black;
        }
      }
    `}</style>
  </>
);

export default bottomNav;
