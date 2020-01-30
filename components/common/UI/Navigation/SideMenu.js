import React from "react";
import RenderIfLoggedIn from "../../../hoc/RenderIfLoggedIn";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import variables from "../../globalVariables";

const sideMenu = props => {
  return (
    <div className="Sidebar">
      <Sidebar as={Menu} icon="labeled" vertical visible>
        {props.options.map((option, index) => {
          return (
            <RenderIfLoggedIn
              key={option.label + index}
              permissions={option.permissions}
            >
              <Menu.Item as="a" onClick={() => props.onClick(option.label)}>
                <Icon name={option.icon} />
                <span>{option.label}</span>
              </Menu.Item>
            </RenderIfLoggedIn>
          );
        })}
      </Sidebar>
      <style jsx>{`
        .Sidebar {
          z-index: 999;
        }

        .Sidebar :global(.sidebar.menu) {
          background: ${variables.mutedColor1};
          top: 64px;
        }

        @media (max-width: 900px) {
          .Sidebar :global(.sidebar.menu) {
            top: 45px;
            width: 60px;
          }

          .Sidebar :global(.sidebar.menu .item) {
            padding: 13px 10px;
            min-width: auto;
          }

          .Sidebar :global(.sidebar.menu .item span) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default sideMenu;
