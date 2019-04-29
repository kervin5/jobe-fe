import React from 'react';
import classes from './JobCreatorForm.module.scss';
import InputField from '../../../common/UI/InputField/InputField.js';
import SwitchInputField from '../../../common/UI/InputField/SwitchInputField/SwitchInputField';

import InputGroup from '../../../common/UI/InputGroup/InputGroup.js';

const jobCreatorForm = () => {
    return(
                <form className={classes.JobCreatorForm}>
                        <InputField type="text" placeholder="Warehouse Manager" label="Job Title"/>
                        <InputField type="text" placeholder="Los Angeles, CA" label="Location" />

                        <InputGroup inline title="Compensation">
                             <InputField type="number" placeholder="$0" label="From" />
                             <InputField type="number" placeholder="$0" label="To" />
                             <InputField type="switch" options={["Hourly","Salary"]}/>
                        </InputGroup>

                        <InputField type="dropdown" options={["Full-Time", "Part-time", "Temp", "Per-diem"]} placeholder={"Job Type"} label={"Job Type"}/>
                        <InputField type="text" placeholder="Warehouse, Clerical" label="Job Category" />
                        <InputField type="textarea" placeholder="Required Skills, Experience, etc." label="Job Description" />
                        {/*<InputField type={"number"} placeholder="Phone"/>*/}
                        {/*<InputField type={"text"} placeholder={"Job Tags"}/>*/}
                        {/*<InputField type={"text"} placeholder={"Application Email or Url"}/>*/}
                        {/*<InputField type={"number"} placeholder={"Minimum rate/h ($)"}/>*/}
                        {/*<InputField type={"number"} placeholder={"Maximum rate/h ($)"}/>*/}
                        {/*<InputField type={"number"} placeholder={"Minimum Salary ($)"}/>*/}
                        {/*<InputField type={"number"} placeholder={"Maximum Salary ($)"}/>*/}
                        {/*<InputField type={"textarea"} placeholder={"Description"}/>*/}
                </form>

    );
};

export default jobCreatorForm;