import React,{useState, useEffect} from 'react';
import variables from '../../globalVariables';
// import classes from './InputField.module.scss';
import DropdownInputField from './DropdownInputField/DropdownInputField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SwitchInputField from './SwitchInputField/SwitchInputField';
import TextField from './TextInputField/TextInputField';




const inputField = (props) => {
    const [touched, setTouched] = useState(false);
    const [errors, setErrors] = useState([]);
    const [value, setValue] = useState(props.value);
    const validation = {
        required: props.required || false
    };
    // const [fieldName, setFieldName] = useState(props.value || "");
    let FieldToRender = null;
    const inputOrnaments = (
        <React.Fragment>
            { props.icon ? <FontAwesomeIcon icon={['fa', props.icon]} className="Icon"/> : null}
       </React.Fragment>
    );

    const changeHandler = (newValue) =>{   
        const valid = errors.length === 0;

        if(!props.name) {
            props.change(newValue);
            
        }else {
            props.change(props.name, newValue, valid);
        }

        setValue(newValue);
    };

    const handleBlur = () => {
        setTouched(true);
        validate();
    }

    useEffect(()=>{
        validate();
    },[value,touched]);

    const validate = () => {
        if(touched) {
            if(validation.required) {
               
                if(value === "") {
                    setErrors(["This field is required"]);
                }else {
                    setErrors([]);
                }
            }
        }
       
    };

    if(['password','email','phone','number','text','textarea'].includes(props.type)) {
        FieldToRender = <TextField inputType={props.type} placeholder={props.placeholder} value={props.value} change={changeHandler} />;
    } else if(props.type === 'switch'){
         FieldToRender = <SwitchInputField options={props.options} value={props.value} change={changeHandler}/>
    } else if(props.type === 'dropdown') {
        FieldToRender = <DropdownInputField placeholder={props.placeholder} options={props.options} value={props.value} change={changeHandler}/>
    }

    const inputClasses = [ 
        props.type !== "switch" ? "InputField" : "Relative", 
        (props.rounded ? "Rounded" : "" ), 
        (props.centerPlaceholder ? "CenterPlaceholder" : ""), 
        (errors.length > 0 ? "WithError" : "")].join(" ") ;

    const errorLabel = ( <p className={"ErrorMessage"}> <FontAwesomeIcon icon={"exclamation-circle"}/> This field is required</p>);



    return(
        <React.Fragment>
            <div className={inputClasses} onBlur={handleBlur}>
                <label>{props.label}</label>
                {props.type !== "textarea" ? inputOrnaments : null }
                {FieldToRender}
                {(props.type !== "switch" && errors.length > 0 ) ? errorLabel : null}
            </div>
            <style jsx>{`
                .InputField {
                    position: relative;
                    padding-left: 15px;
                    padding-right: 15px;
                    background-color: ${variables.clearColor};
                    min-height: ${variables.inputHeight};
                    margin-bottom: 10px;
                    margin-top: 30px;
                    border-radius: 8px;
                    border: 1px solid ${variables.mutedColor2};
                    display: flex;
                    align-items: center;
                    transition: 300ms;
                }


                .Icon {
                    color: ${variables.accentColor1};
                    left: 30px;
                    position: absolute;
                }

                .Relative {
                    position: relative;
                  }
                  
                  .Rounded {
                      border-radius: ${variables.roundedRadius};
                  }

                  .ErrorMessage {
                    color: red !important;
                    position: absolute;
                    top: initial !important;
                    bottom: -25px;
                    left: 0px;
                    font-size: 0.8em;
                    font-weight: 400 !important;
                  }
                  
            `}</style>
        </React.Fragment>
    );
};

export default inputField;