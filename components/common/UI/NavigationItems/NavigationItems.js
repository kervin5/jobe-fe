import React from 'react';

// import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem.js';


const navigationItems = () => {
    return (
        <div className={classes.NavigationItems}>
            <NavigationItem/>
            <NavigationItem/>
            <NavigationItem/>
        </div>
    );
};

export default navigationItems;