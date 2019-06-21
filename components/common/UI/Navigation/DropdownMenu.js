import React, { useState } from 'react';

import NavigationItem from '../Navigation/NavigationItems/NavigationItems';
import Icon from '../Icon';

const dropdownMenu = () => {
    // const [openMenu, setOpenMenu] = useState({status: false});

    // const showMenu = () => {
    //     setOpenMenu(!openMenu);
    // }

    // if(menuToggle) {
    //     return (
    //         <div>
    //             <NavigationItem>Settings</NavigationItem>
    //             <NavigationItem>Profile</NavigationItem>
    //             <NavigationItem>Sign Out</NavigationItem>
    //         </div>
    //     )
    // }

    return (

        <NavigationItem>
            <Icon icon={"user"} />       
            <style jsx>{`
                .Dropdown {
                    background-color: "pink";
                }
                `}</style>    
        </NavigationItem>
    )
}

export default dropdownMenu;