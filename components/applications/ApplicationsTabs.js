import { useState } from "react";
import { Input, Menu, Segment } from "semantic-ui-react";

const ApplicationsTableSegments = () => {
  const [activeItem, setActiveItem] = useState("bio");

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div>
      <Menu attached="top" tabular>
        <Menu.Item
          name="bio"
          active={activeItem === "bio"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="photos"
          active={activeItem === "photos"}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input
              transparent
              icon={{ name: "search", link: true }}
              placeholder="Search users..."
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Segment attached="bottom">
        <img src="/images/wireframe/paragraph.png" />
      </Segment>
    </div>
  );
};

export default ApplicationsTableSegments;
