import React from 'react';
import classes from './InputField.module.scss';

const inputField = (props) => {
    return(
        <div className={classes.InputField}>
            <label>{props.label}</label>
            <input type={props.type} placeholder={props.placeholder}/>
        </div>
    );
};

export default inputField;