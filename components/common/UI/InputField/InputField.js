import React,{useState} from 'react';
import classes from './InputField.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const inputField = (props) => {
    const [value, setValue] = useState("");
    let FieldToRender = null;
    const inputOrnaments = (
        <React.Fragment>
            { props.icon ? <FontAwesomeIcon icon={props.icon} className={classes.Icon}/> : null}
       </React.Fragment>
    );

    const changeHandler = (e) =>{
        const newValue = e.target.value;
        // setValue(newValue);

        if (props.type === "number") {
            if(!newValue.match(/[a-zA-Z]/i) ) {
                setValue(newValue);
            }
        }else {
            setValue(newValue);
        }
    };

    if(props.type === "textarea") {
        FieldToRender = "textarea";
    } else {
        FieldToRender = "input";
    }

    const inputClasses = [classes.InputField, (props.rounded ? classes.Rounded : "" ), (props.centerPlaceholder ? classes.CenterPlaceholder : "")].join(" ") ;
    return(
        <div className={inputClasses}>
            <label>{props.label}</label>
            {props.type !== "textarea" ? inputOrnaments : null }
            <FieldToRender type={props.type} placeholder={props.placeholder} value={value} onChange={changeHandler}/>
        </div>
    );
};

export default inputField;