import React from "react";
import variables from "../../../../components/common/globalVariables";
// import classes from './NavigationBar.module.scss';
import { Link } from "../../../../routes";
// import Router from 'next/router';
import NavigationItems from "./NavigationItems/NavigationItems";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const MyExactStaffLogo = "../../../../static/images/LandingLogo.svg";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const navigationBar = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );

  // return (
  //   <nav>
  //     <div>
  //       <Link route={"/"}>
  //         <a>
  //           <img src={MyExactStaffLogo}></img>
  //         </a>
  //       </Link>
  //     </div>
  //     <div></div>
  //     <NavigationItems />

  //     <style jsx>{`
  //       nav {
  //         background-color: ${variables.mutedColor1};
  //         height: 50px;
  //         display: flex;
  //         justify-content: space-between;
  //         padding-left: 30px;
  //         padding-right: 30px;
  //       }

  //       nav img {
  //         height: 35px;
  //         margin: 10px auto 0px;
  //       }
  //     `}</style>
  //   </nav>
  // );
};

export default navigationBar;
