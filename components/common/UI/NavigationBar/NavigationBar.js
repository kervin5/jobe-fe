import React from 'react';

import classes from './NavigationBar.module.scss';
import {Link} from '../../../../routes';

import NavigationItems from '../NavigationItems/NavigationItems';


const MyExactStaffLogo = "../../../../static/images/LandingLogo.svg";

const navigationBar = (props) => {
    return(
        <nav className={classes.NavigationBar}>
            <div>
                <Link route={"/"}>
                    <a>
                        <img src={MyExactStaffLogo}></img>
                    </a>
                </Link>
            </div>
             <div></div>
            <NavigationItems/>
        </nav>
    );
};

export default navigationBar;