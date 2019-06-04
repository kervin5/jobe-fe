import React from 'react';
import variables from '../../globalVariables';
// import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem.js';


const navigationItems = () => {
    return (
        <div>
            <NavigationItem/>
            <NavigationItem/>
            <NavigationItem/>
            <style jsx>{`
                div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                }
            `}</style>
        </div>
    );
};

export default navigationItems;