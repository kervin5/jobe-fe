import {useState, useEffect} from 'react';
import axios from '../../../data/api';
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
    
        if(email.valid && password.valid) {
            try {
                // const result = await axios.post('https://myexactjobsapi.herokuapp.com/api/auth',{email: email.value, password: password.value, withCredentials: true});
                const result = await axios({ 
                    method: 'post',
                    url: '/auth',
                    data: {
                        email: email.value, password: password.value
                    },
                    withCredentials: true
                });

                // postData('https://myexactjobsapi.herokuapp.com/api/auth',{
                //     email: email.value, password: password.value
                // });
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

function postData(url = '', data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'include', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        //  redirect: 'follow', // manual, *follow, error
          //referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses JSON response into native Javascript objects 
  }


export default loginForm;