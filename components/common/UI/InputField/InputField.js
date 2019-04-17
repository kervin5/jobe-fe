import React,{useState} from 'react';
import classes from './InputField.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const inputField = (props) => {
    const [hasContent, setHasContent]  = useState(false);
    const [value, setValue] = useState("");
    let FieldToRender = null;
    const inputOrnaments = (
        <React.Fragment>
            <FontAwesomeIcon icon={"user"} className={classes.Icon}/>

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

        if(newValue !== ""){
            setHasContent(true)
        }else {
            setHasContent(false);
        }
    };

    if(props.type === "textarea") {
        FieldToRender = "textarea";
    } else {
        FieldToRender = "input";
    }

    const inputClasses = classes.InputField + " " + (hasContent ? classes.Filled :  "") + " " + (props.type === 'textarea' ? classes.TextArea : "");

    return(
        <div className={inputClasses}>
            <label>{props.label}</label>
            <FieldToRender type={props.type} placeholder="" value={value} onChange={changeHandler}/>
            {props.type !== "textarea" ? inputOrnaments : null }
             <p className={classes.Placeholder}>{props.placeholder}</p>
        </div>
    );
};

export default inputField;