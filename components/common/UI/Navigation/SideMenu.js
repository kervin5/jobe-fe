import React from "react";
import RenderIfLoggedIn from "../../../hoc/RenderIfLoggedIn";
import { Sidebar, Menu, Icon, Dropdown } from "semantic-ui-react";
import variables from "../../globalVariables";
import Link from "next/link";

const sideMenu = props => {
  return (
    <div className="Sidebar">
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
        <Menu.Item>
          Home
          <Menu.Menu>
            <Menu.Item
              name="search"
              // active={activeItem === "search"}
              // onClick={this.handleItemClick}
            >
              Search
            </Menu.Item>
            <Menu.Item
              name="add"
              // active={activeItem === "add"}
              // onClick={this.handleItemClick}
            >
              Add
            </Menu.Item>
            <Menu.Item
              name="about"
              // active={activeItem === "about"}
              // onClick={this.handleItemClick}
            >
              Remove
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Dropdown item text="More">
          <Dropdown.Menu>
            <Dropdown.Item icon="edit" text="Edit Profile" />
            <Dropdown.Item icon="globe" text="Choose Language" />
            <Dropdown.Item icon="settings" text="Account Settings" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
      <style jsx>{`
        .Sidebar {
          z-index: 999;
          padding-top: 10px;
        }

        .Sidebar :global(> .menu) {
          height: 100%;
          border-radius: 0;
        }

        @media (max-width: 900px) {
          .Sidebar {
            padding-top: 0px;
            width: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default sideMenu;
