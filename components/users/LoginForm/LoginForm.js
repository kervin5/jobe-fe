import React,{useState, useEffect} from 'react';
import uniqid from 'uniqid';
import InputField from '../../common/UI/Input/InputField';
import Button from '../../common/UI/Button';
import Title from '../../common/UI/Title';


const loginForm = () => {
    const [formData, setFormData] = useState({
        email: {
            value: "",
            valid: false,
            type: "text",
            label: "Email",
            placeholder: "jdoe@myemail.com",
            icon: "envelope"
        },
        password: {
            value: "",
            valid: false,
            type: "text",
            label: "Password",
            placeholder: "Password",
            icon: "key"
        }
    });

    const changeHandler = (key,value,valid) => {
        const newState = {
            ...formData,
            [key]:{
                ...formData[key],
                value: value,
                valid: valid
            }
        };

        setFormData(newState);
    };

    const fieldsToRender = Object.keys(formData).map(key=>{
        const fieldData = formData[key];
        return <InputField 
            change={changeHandler} 
            name={key} 
            key={"loginField"+key} 
            type={fieldData.type} 
            label={fieldData.label} 
            rounded 
            placeholder={fieldData.placeholder}
            value={fieldData.value}
            label={fieldData.label}
            icon={fieldData.icon}
            />;
    });

    return(
    <React.Fragment>
        
        <form>
            <Title center>Login</Title>
                {fieldsToRender}
            <Button>Sign In</Button>
        </form>
    </React.Fragment>
    );
}

export default loginForm;