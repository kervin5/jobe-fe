import React from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import NavigationItem from "./NavigationItems/NavigationItem";
import LogoutButtonMobile from "../LogOutButtonMobile";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import RenderIfLoggedOut from "@/components/hoc/RenderIfLoggedOut";

const StyledBottomNav = styled.nav`
  display: none;

  .NavigationItem {
    .NavigationItemContent {
      padding-top: 6px;
      padding-bottom: 6px;
    }

    i {
      color: ${(props) => props.theme.lightColor} !important;

      &:hover {
        color: ${(props) => props.theme.accentColor3} !important;
      }
    }
  }

  @media (max-width: 900px) {
    background-color: ${(props) => props.theme.accentColor1};
    color: ${(props) => props.theme.lightColor1};
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    align-content: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1999;
  }
`;

const bottomNav = () => (
  <StyledBottomNav className="BottomNav">
    <NavigationItem href="/">
      <Icon>search</Icon>
    </NavigationItem>
    <RenderIfLoggedOut>
      <NavigationItem href={"/user/login"}>
        <Icon>favorite</Icon>
      </NavigationItem>
      <NavigationItem href={"/user/register"}>
        <Icon>person</Icon>
      </NavigationItem>
    </RenderIfLoggedOut>
    <RenderIfLoggedIn permissions={[{ object: "JOB", action: "CREATE" }]}>
      <NavigationItem href={"/admin/dashboard"}>
        <Icon>dashboard</Icon>
      </NavigationItem>
    </RenderIfLoggedIn>
    <RenderIfLoggedIn
      permissions={[{ object: "APPLICATION", action: "CREATE" }]}
    >
      <NavigationItem href={"/me"}>
        <Icon>person</Icon>
      </NavigationItem>
    </RenderIfLoggedIn>
    <RenderIfLoggedIn>
      <NavigationItem>
        <LogoutButtonMobile />
      </NavigationItem>
    </RenderIfLoggedIn>
  </StyledBottomNav>
);

export default bottomNav;
