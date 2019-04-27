import React from 'react';
import classes from './SwitchInputField.module.scss';

const switchInputField = props => {
    return (
        <div className={classes.SwitchInputField}>
            <label>{props.label}</label>
            <span className={classes.Selector} />
            <ul className={classes.Switch}>
                <li className={classes.Selected}>Hourly</li>
                <li>Salary</li>
            </ul>
            <input type="hidden"/>
        </div>
    )
};

export default switchInputField;