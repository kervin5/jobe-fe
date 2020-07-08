import React from "react";
import { Dropdown } from "semantic-ui-react";
import LogoutButton from "@/common/UI/LogoutButton";
import Link from "next/link";
import UserInfo from "@/components/me/UserInfo";
import appText from "@/lang/appText";

const NavigationItemUserMenu = () => {
  return (
    <UserInfo>
      {({ userInfo }) => {
        return (
          <Dropdown text={userInfo.name} pointing className="UserNameLink">
            <Dropdown.Menu>
              {/* <Dropdown.Header>Categories</Dropdown.Header> */}
              <Link href="/me" passHref>
                <Dropdown.Item as="a">
                  {appText.objects.profile.singular}
                </Dropdown.Item>
              </Link>
              {/* <Dropdown.Item>Bedroom</Dropdown.Item> */}
              <Dropdown.Divider />

              <LogoutButton />
            </Dropdown.Menu>
          </Dropdown>
        );
      }}
    </UserInfo>
  );
};

export default NavigationItemUserMenu;
