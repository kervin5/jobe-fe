import {useState} from 'react';
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
                <InputType type={props.inputType} placeholder={props.placeholder} value={props.value || ''} onChange={changeHandler}/>
                {inputStyles}
            </React.Fragment>);
        
};

export default textInputField;