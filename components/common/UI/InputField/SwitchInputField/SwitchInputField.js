import React,{useState} from 'react';
import classes from './SwitchInputField.module.scss';

const switchInputField = props => {
    const values = {
        left: props.options[0],
        right: props.options[1]
    };

    const [selectedValue, setSelectedValue] = useState(props.value === values.left ? values.left : values.right);
    const [selectorPosition, setSelectorPosition] = useState(classes.left);

    const clickHandler = (e) => {
        // console.log(e.target.getAttribute('data-value'));
        const clickedElement = e.target.getAttribute('data-position');
        setSelectedValue(values[clickedElement]);
        setSelectorPosition(classes[clickedElement]);
        props.change(values[clickedElement]);
    };

    return (
        <div className={classes.SwitchInputField}>
            <label>{props.label}</label>
            <ul className={classes.Switch}>
                <li data-position="left" onClick={clickHandler}>{values.left}</li>
                <li data-position="right" onClick={clickHandler}>{values.right}</li>
            </ul>
            <span className={classes.Selector + " " + selectorPosition}> {selectedValue} </span>
            <input type="hidden" value={selectedValue}/>
        </div>
    )
};

export default switchInputField;