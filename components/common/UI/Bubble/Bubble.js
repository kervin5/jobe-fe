import React from 'react';
import classes from './Bubble.module.scss';

const bubble = (props) => {
    return (
        <span className={classes.Bubble}>
            {props.children}
        </span>
    );
}

export default bubble;