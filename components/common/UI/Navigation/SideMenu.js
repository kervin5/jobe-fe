import React, { useState } from "react";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import { Menu, Icon, Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import Link from "next/link";

const StyledSideMenu = styled.div`
  &.SideMenu {
    z-index: 999;
    position: fixed;
    left: ${props => (props.open ? 0 : "-300px")};
    bottom: 0%;
    top: 60px;
    transition: 300ms;

    & > .menu {
      height: 100%;
    }
  }
`;

const sideMenu = props => {
  return (
    <StyledSideMenu className="SideMenu" open={props.open}>
      <Menu vertical>
        {props.options.map((option, index) => {
          return (
            <RenderIfLoggedIn
              key={option.label + index}
              permissions={option.permissions}
            >
              <Link href={`${option.path}`} passHref>
                <Menu.Item as="a">
                  <Icon name={option.icon} />
                  <span>{option.label}</span>
                </Menu.Item>
              </Link>
            </RenderIfLoggedIn>
          );
        })}

        <Dropdown item text="Definitions">
          <Dropdown.Menu>
            <Link href={`/admin/definitions/perks`} passHref>
              <Dropdown.Item icon="edit" text="Perks" as="a" />
            </Link>
            {/* <Dropdown.Item icon="globe" text="Choose Language" />
            <Dropdown.Item icon="settings" text="Account Settings" /> */}
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </StyledSideMenu>
  );
};

export default sideMenu;
