import {useState} from 'react';
import variables from '../../../globalVariables';
import inputStyles from '../InputStyles';

const textInputField = props => {

    const changeHandler = (e) =>{
        props.change(e.target.value);
    };

    let InputType = "input";

    if(props.inputType === 'textarea'){
        InputType = "textarea";
    }

    return (<React.Fragment>
                <InputType type={props.inputType} placeholder={props.placeholder} value={props.value || ''} onChange={changeHandler} />
               
                 <style jsx>{`
                 input, textarea, select {
                    border: none;
                    margin: 5px 20px 5px 15px;
                    width: 90%;
                    outline: none;
                }
                
                input::placeholder, textarea::placeholder, select::placeholder {
                     color: ${variables.secondaryTextColor};   
                }
                
                textarea {
                    min-height: 300px;
                    padding-top: 15px;
                }
                
                label {
                    color: ${variables.baseTextColor};
                }
                 `}</style>
             
            </React.Fragment>);
        
};

export default textInputField;