import React from "react";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import variables from "../../globalVariables";

const SidebarExampleVisible = () => (
  <div className={"Sidebar"}>
    <Sidebar as={Menu} icon="labeled" vertical visible>
      <Menu.Item as="a">
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="gamepad" />
        Jobs
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="camera" />
        Applicantions
      </Menu.Item>
    </Sidebar>
    <style jsx>{`
      .Sidebar {
        position: relative;
        top: 10;
      }

      .Sidebar :global(.sidebar.menu) {
        background: ${variables.mutedColor1};
        top: 60px;
        height: auto !important;
        border-top-right-radius: 10px !important;
        border-top-bottom-radius: 10px !important;
      }
    `}</style>
  </div>
);

export default SidebarExampleVisible;
