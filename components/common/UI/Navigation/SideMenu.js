import React, { useState } from "react";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import variables from "../../globalVariables";

const sideMenu = props => {
  return (
    <div className={"Sidebar"}>
      <Sidebar as={Menu} icon="labeled" vertical visible>
        {props.options.map((option, index) => {
          return (
            <Menu.Item
              key={option.label + index}
              as="a"
              onClick={() => props.click(option.label)}
            >
              <Icon name={option.icon} />
              {option.label}
            </Menu.Item>
          );
        })}
      </Sidebar>
      <style jsx>{`
        .Sidebar {
          z-index: 999;
        }

        .Sidebar :global(.sidebar.menu) {
          background: ${variables.mutedColor1};
          top: 54px;
        }
      `}</style>
    </div>
  );
};

export default sideMenu;
