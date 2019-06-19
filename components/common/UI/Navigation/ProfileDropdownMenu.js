import React, { useState, useEffect } from 'react';

import NavigationItem from '../Navigation/NavigationItems/NavigationItems';
import Button from '../Button';

const profileDropdownMenu = () => {
    const [openMenu, setOpenMenu] = useState({status: false});

    const showMenu = () => {
        setOpenMenu(!openMenu);
    }

    const menuToggle = showMenu;

    if(menuToggle) {
        return (
            <div>
            <NavigationItem>Settings</NavigationItem>
            <NavigationItem>Profile</NavigationItem>
            <NavigationItem>Sign Out</NavigationItem>

        </div>
        )
    }

    return (
        <div style={"Dropdown"}>
                {menuToggle}
                
                <style jsx>{`
                .Dropdown {
                    background-color: "pink";
                }
                `}</style>
        </div>
    )
}

export default profileDropdownMenu;