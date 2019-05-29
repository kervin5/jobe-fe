import React,{useState} from 'react';
import classes from './InputField.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from './TextInputField/TextInputField';
import SwitchInputField from './SwitchInputField/SwitchInputField';
import DropdownInputField from './DropdownInputField/DropdownInputField';

const inputField = (props) => {
    const [touched, setTouched] = useState(false);
    // const [value, setValue] = useState(props.value || "");
    // const [fieldName, setFieldName] = useState(props.value || "");
    let FieldToRender = null;
    const inputOrnaments = (
        <React.Fragment>
            { props.icon ? <FontAwesomeIcon icon={props.icon} className={classes.Icon}/> : null}
       </React.Fragment>
    );

    const changeHandler = (value) =>{
        // const newValue = e.target.value;
        // // setValue(newValue);
        //
        // if (props.type === "number") {
        //     if(!newValue.match(/[a-zA-Z]/i) ) {
        //         setValue(newValue);
        //     }
        // }else {
        //     setValue(newValue);
        // }

        if(!props.name) {
            props.change(value);
        }else {
            props.change(props.name, value);
        }
    };

    const handleFocus = () => {
        setTouched(true);
    }

    if(['password','email','phone','number','text','textarea'].includes(props.type)) {
        FieldToRender = <TextField inputType={props.type} placeholder={props.placeholder} value={props.value} change={changeHandler}/>;
    } else if(props.type === 'switch'){
         FieldToRender = <SwitchInputField options={props.options} value={props.value} change={changeHandler}/>
     } else if(props.type === 'dropdown') {
        FieldToRender = <DropdownInputField placeholder={props.placeholder} options={props.options} value={props.value} change={changeHandler}/>
     }

    const inputClasses = [ 
        props.type !== "switch" ? classes.InputField : classes.Relative, 
        (props.rounded ? classes.Rounded : "" ), 
        (props.centerPlaceholder ? classes.CenterPlaceholder : ""), 
        (touched ? classes.WithError : "")].join(" ") ;

    return(
        <React.Fragment>
            <div className={inputClasses} onFocus={handleFocus}>
                <label>{props.label}</label>
                {props.type !== "textarea" ? inputOrnaments : null }
                {FieldToRender}
                <p className={classes.ErrorMessage}>This field is required</p>
            </div>
       
        </React.Fragment>
    );
};

export default inputField;