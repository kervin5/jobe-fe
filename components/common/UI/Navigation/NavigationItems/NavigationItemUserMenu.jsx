import React from "react";
import LogoutButton from "@/common/UI/LogoutButton";

import UserInfo from "@/components/me/UserInfo";
import appText from "@/lang/appText";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function NavigationItemUserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <UserInfo>
      {({ userInfo }) => {
        return (
          <div>
            <Button
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              {userInfo.name}
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* <Link passHref> */}
              <MenuItem>
                <a href="/me">{appText.objects.profile.singular}</a>
              </MenuItem>
              {/* </Link> */}
              <LogoutButton />
            </Menu>
          </div>
        );
      }}
    </UserInfo>
  );
}
