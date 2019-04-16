import React from 'react';
import classes from './PageSection.module.scss';

const pageSection = props => {
    const extraClasses = props.className || " ";
    return(
        <div className={classes.PageSection + " " +extraClasses}>
            {props.children}
        </div>
    );
};

export default pageSection