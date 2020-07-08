import React, { useState } from "react";
import styled from "styled-components";
import appText from "@/lang/appText";
import NavigationItem from "./NavigationItem.js";
import NavigationItemUserMenu from "./NavigationItemUserMenu";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import RenderIfLoggedOut from "@/components/hoc/RenderIfLoggedOut";
import HamburgerMenu from "@/common/UI/Navigation/HamburgerMenu";

const StyledNavigationItems = styled.div`
  &.NavigationItems {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .UserNameLink {
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

      .menu {
        width: 100%;
      }

      a {
        text-decoration: none;
        color: ${props => props.theme.baseTextColor};
        text-transform: capitalize;
      }

      &:hover {
        background-color: white;
        border-bottom: 5px solid orangered;
      }
    }
  }

  @media (max-width: 900px) {
    &.NavigationItems {
      background-color: ${props => props.theme.clearColor};
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

      &.Open {
        left: 0;
      }

      .NavigationItem {
        margin-bottom: 30px;
      }
    }
  }
`;

const navigationItems = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HamburgerMenu onChange={setOpen} open={open} />
      <StyledNavigationItems
        className={"NavigationItems " + (open ? "Open" : "")}
        onClick={() => setOpen(false)}
      >
        <NavigationItem href="/">
          {`${appText.actions.search} ${appText.objects.job.plural}`}
        </NavigationItem>
        <RenderIfLoggedOut>
          <NavigationItem href={"/user/login"}>
            {appText.actions.login}
          </NavigationItem>
          <NavigationItem href={"/user/register"}>
            {appText.actions.register}
          </NavigationItem>
        </RenderIfLoggedOut>
        <RenderIfLoggedIn permissions={[{ object: "JOB", action: "CREATE" }]}>
          <NavigationItem href={"/admin/dashboard"}>Dashboard</NavigationItem>
        </RenderIfLoggedIn>
        <RenderIfLoggedIn>
          <NavigationItemUserMenu />
        </RenderIfLoggedIn>
      </StyledNavigationItems>
    </>
  );
};

export default React.memo(navigationItems);
