import React,{useState} from 'react';
import classes from './InputField.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from './TextInputField/TextInputField';
import SwitchInputField from './SwitchInputField/SwitchInputField';
import DropdownInputField from './DropdownInputField/DropdownInputField';

const inputField = (props) => {
    const [value, setValue] = useState(props.value || "");
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
        props.change(props.name, value);
    };
     if(['password','email','phone','number','text','textarea'].includes(props.type)) {
        FieldToRender = <TextField inputType={props.type} placeholder={props.placeholder} value={props.value} change={changeHandler}/>;
    } else if(props.type === 'switch'){
         FieldToRender = <SwitchInputField options={props.options} value={props.value} change={changeHandler}/>
     } else if(props.type === 'dropdown') {
        FieldToRender = <DropdownInputField placeholder={props.placeholder} options={props.options} value={props.value} change={changeHandler}/>
     }

    const inputClasses = [ props.type !== "switch" ? classes.InputField : "", (props.rounded ? classes.Rounded : "" ), (props.centerPlaceholder ? classes.CenterPlaceholder : "")].join(" ") ;
    return(
        <div className={inputClasses}>
            <label>{props.label}</label>
            {props.type !== "textarea" ? inputOrnaments : null }
            {/*<FieldToRender type={props.type} placeholder={props.placeholder} value={value} onChange={changeHandler}/>*/}
            {FieldToRender}
        </div>
    );
};

export default inputField;