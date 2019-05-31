import React from 'react';
import classes from './Bubble.module.scss';

const bubble = (props) => {
    const color = "Color"+ props.color || 1;


    return (
        <span className={classes.Bubble + " " +(classes[color])}>
            {props.children}
        </span>
    );
}

export default bubble;