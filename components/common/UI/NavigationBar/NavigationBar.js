import React from 'react';
import classes from './NavigationBar.module.scss';
import NavigationItems from '../NavigationItems/NavigationItems';

const MyExactStaffLogo = "../../../../static/images/LandingLogo.svg";

const navigationBar = (props) => {
    return(
        <nav className={classes.NavigationBar}>
            <div>
                <img src={MyExactStaffLogo}></img>
            </div>
             <div></div>
            <NavigationItems/>
        </nav>
    );
};

export default navigationBar;