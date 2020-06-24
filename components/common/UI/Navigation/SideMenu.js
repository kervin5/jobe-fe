import React from "react";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import { Menu, Icon, Dropdown } from "semantic-ui-react";
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

        <Dropdown item text="Dictionary">
          <Dropdown.Menu>
            <Link href={`/admin/settings/dictionary/perks`} passHref>
              <Dropdown.Item icon="edit" text="Perks" as="a" />
            </Link>
            {/* <Dropdown.Item icon="globe" text="Choose Language" />
            <Dropdown.Item icon="settings" text="Account Settings" /> */}
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
      <style jsx>{`
        .Sidebar {
          z-index: 999;
          padding-top: 10px;
          align-self: stretch;
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
