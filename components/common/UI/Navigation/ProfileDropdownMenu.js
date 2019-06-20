import React, { useState } from 'react';

import NavigationItem from '../Navigation/NavigationItems/NavigationItems';

const dropdownMenu = () => {
    const [openMenu, setOpenMenu] = useState({status: false});

    const showMenu = () => {
        setOpenMenu(!openMenu);
    }

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
                {showMenu}
                
                <style jsx>{`
                .Dropdown {
                    background-color: "pink";
                }
                `}</style>
        </div>
    )
}

export default dropdownMenu;