import React from 'react';
import variables from '../../common/globalVariables';
import {useState, useEffect} from 'react';
import InputField from '../../common/UI/Input/InputField'
import Title from '../../common/UI/Title';
import Button from '../../../components/common/UI/Button';

const RegisterForm = () => {
    const [registerData, setRegisterData] = useState({
        firstName:{
            value: "",
            valid: false,
            type: "text",
            label: "First Name",
            placeholder: "John",
        },
        lastName : {
            value: "",
            valid: false,
            type: "text",
            label: "Last Name",
            placeholder: "Doe",
        },
        emailAddress: {
            value: "",
            valid: false,
            type: "text",
            label: "Email Address",
            placeholder: "john@doe.com",
        },
        dateOfBirth: {
            value: "",
            valid:false,
            type: "number",
            label: "Birthdate",
            placeholder: "01/01/2099"
        }
    });

    const updatedFieldHandler = (key, value, valid) => {
        const updatedState = {
            ...registerData,
            [key]:{
                ...registerData[key],
                value: value,
                valid: valid
            }
        }
        setRegisterData(updatedState);
    };

    const registerFormData = Object.keys(registerData).map(key => {
        const registerDataField = registerData[key];
        return <InputField
            change={updatedFieldHandler}
            value={registerDataField.value}
            type={registerDataField.type}
            label={registerDataField.label}
            placeholder={registerDataField.placeholder}
            required
        />;
    })

    return (
        <form>
            <Title center>Register</Title><br />
            {registerFormData}<br />
            <Button>Submit</Button>

            <style jsx>{`

            `}</style>
        </form>
    )
}

export default RegisterForm;