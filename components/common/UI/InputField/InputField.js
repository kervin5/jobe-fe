import React,{useState} from 'react';
import classes from './InputField.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const inputField = (props) => {
    const [hasContent, setHasContent]  = useState(false);
    const [value, setValue] = useState("");

    const changeHandler = (e) =>{
        const newValue = e.target.value;
        setValue(newValue);
        if(newValue !== ""){
            setHasContent(true)
        }else {
            setHasContent(false);
        }
    };

    console.log(hasContent);

    return(
        <div className={classes.InputField + " " + (hasContent ? classes.Filled :  "")}>
            <label>{props.label}</label>
            <input type={props.type} placeholder="" value={value} onChange={changeHandler}/>
            <FontAwesomeIcon icon={"user"} className={classes.Icon}/>
            <p className={classes.Placeholder}>{props.placeholder}</p>
        </div>
    );
};

export default inputField;