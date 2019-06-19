import React from 'react';
import variables from '../../../globalVariables';
// import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem.js';
import Icon from '../../Icon';
import ProfileDropdownMenu from '../ProfileDropdownMenu';


const navigationItems = () => {
    return (
        <div>
            <NavigationItem>Search Jobs</NavigationItem>
            <NavigationItem>
                <Icon icon={"user"}/>
            </NavigationItem> 
            {/* <NavigationItem>   <ProfileDropdownMenu/> </NavigationItem>           */}
            <style jsx>{`
                div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                }

                @media(max-width: 900px){
                    div {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default navigationItems;