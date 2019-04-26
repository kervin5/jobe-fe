import React from 'react';
import classes from './JobCreatorForm.module.scss';
import InputField from '../../../common/UI/InputField/InputField.js';

const jobCreatorForm = () => {
    return(

                <form className={classes.JobCreatorForm}>
                        <InputField type="text" placeholder="Warehouse Manager" label="Job Title"/>
                        <InputField type="text" placeholder="Los Angeles, CA" label="Location" />
                        <InputField type={"number"} placeholder="Phone"/>
                        <InputField type={"text"} placeholder={"Job Tags"}/>
                        <InputField type={"text"} placeholder={"Application Email or Url"}/>
                        <InputField type={"number"} placeholder={"Minimum rate/h ($)"}/>
                        <InputField type={"number"} placeholder={"Maximum rate/h ($)"}/>
                        <InputField type={"number"} placeholder={"Minimum Salary ($)"}/>
                        <InputField type={"number"} placeholder={"Maximum Salary ($)"}/>
                        <InputField type={"textarea"} placeholder={"Description"}/>
                </form>

    );
};

export default jobCreatorForm;