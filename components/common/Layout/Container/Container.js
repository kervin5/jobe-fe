import React from 'react';
import classes from './Container.module.scss';

const container = (props) => {
    // const customWidth = props.maxWidth || "900px";


    return(
        <div className={classes.Container + (props.ClassName || "")}>
            {props.children}
        </div>
    );
}

export default container;