import React from 'react';

import classes from './BottomNav.modules.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const bottomNav = () => (
    <div className={classes.bottomNav}>
        <FontAwesomeIcon icon="search" color="white"  />
        <FontAwesomeIcon icon="heart" color="white"  />
        <FontAwesomeIcon icon="home" color="white"  />
        <FontAwesomeIcon icon="user" color="white"  />
    </div>
)

export default bottomNav;