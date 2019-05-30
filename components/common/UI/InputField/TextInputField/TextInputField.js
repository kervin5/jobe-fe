import React,{useState} from 'react';

const textInputField = props => {

    // const [value, setValue] = useState("");

    const changeHandler = (e) =>{
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
        props.change(e.target.value);
    };

    let InputType = "input";

    if(props.inputType === 'textarea'){
        InputType = "textarea";
    }

    return   <InputType type={props.inputType} placeholder={props.placeholder} value={props.value || ''} onChange={changeHandler}/>;
};

export default textInputField;