import {useState, useEffect} from 'react';
import axios from 'axios';
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

    const submitHandler = async (e) => {
        e.preventDefault();
        const {email, password} = formData;
       

        console.log()
        if(email.valid && password.valid) {
            try {
            const result = await axios.post('https://myexactjobsapi.herokuapp.com/api/auth',{email: email.value, password: password.value});

            console.log(result);
            }
            catch(ex) {
                console.log("Error",ex.response);
            }
        }

        

        
    }  

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
            required
            />;
    });

    return(
    <React.Fragment>
        
        <form >
            <Title center>Login</Title>
                {fieldsToRender}
                <br />
            <Button click={submitHandler}>Sign In</Button>
            
        </form>
        <style jsx>{`
            form {
                margin-bottom: 30px;
                width:100%;
                max-width: 500px;
            }


            `}</style>
    </React.Fragment>
    );
}

export default loginForm;