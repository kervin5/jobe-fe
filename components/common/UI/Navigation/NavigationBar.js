import React from 'react';
import variables from '../../../../components/common/globalVariables';
// import classes from './NavigationBar.module.scss';
import {Link} from '../../../../routes';
// import Router from 'next/router';

import NavigationItems from './NavigationItems/NavigationItems';


const MyExactStaffLogo = "../../../../static/images/LandingLogo.svg";

const navigationBar = (props) => {
    return(
        <nav>
            <div>
                <Link route={"/"}>
                    <a>
                        <img src={MyExactStaffLogo}></img>
                    </a>
                </Link>
            </div>
             <div></div>
            <NavigationItems/>

            <style jsx>{`
                nav {
                    background-color: ${variables.accentColor3};
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    padding-left: 30px;
                    padding-right: 30px;
                }

                nav img {
                    height: 35px;
                    margin: 10px auto 0px;
                }
            `}</style>
        </nav>
    );
};

export default navigationBar;