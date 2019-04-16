import React from 'react';
import classes from './NavigationBar.module.scss';
import NavigationItems from '../NavigationItems/NavigationItems';

const navigationBar = (props) => {
    return(
        <nav className={classes.NavigationBar}>
            <div></div>
             <div></div>
            <NavigationItems/>
        </nav>
    );
};

export default navigationBar;