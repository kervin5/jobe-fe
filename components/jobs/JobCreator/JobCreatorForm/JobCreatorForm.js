import React, {Component} from 'react';
import axios from 'axios';
import classes from './JobCreatorForm.module.scss';
import InputField from '../../../common/UI/InputField/InputField.js';
import Button from '../../../common/UI/Button/Button';

import InputGroup from '../../../common/UI/InputGroup/InputGroup.js';

class JobCreatorForm extends Component {

    state = {
      formData: {
          jobTitle: "",
          jobLocation: "",
          minCompensation: "",
          maxCompensation: "",
          compensationType: "Hourly",
          jobType: "",
          jobCategory: "",
          jobDescription: ""
      }
    };

    changeHandler = (field,value) => {
      console.log(field,value);
      this.setState(prevState => {
          return {
              ...prevState,
            formData: {
                ...prevState.formData,
                [field]: value
            }
          };
      });
    };

    submitFormHandler = (e) => {
        e.preventDefault();
        const jobData = {
            title: this.state.formData.jobTitle,
            location: this.state.formData.jobLocation,
            minCompensation: this.state.formData.minCompensation,
            maxCompensation: this.state.formData.maxCompensation,
            compensationType: this.state.formData.compensationType,
            type: this.state.formData.jobType,
            category: this.state.formData.jobCategory,
            description: this.state.formData.jobDescription
        };

        axios.post("https://myexactjobsapi.herokuapp.com/api/jobs",jobData)
        .then(res=>{
            console.log(res);
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    render() {
        return (
            <form className={classes.JobCreatorForm}>
                <InputField type="text" placeholder="Warehouse Manager" label="Job Title" value={this.state.formData.jobTitle} name={"jobTitle"} change={this.changeHandler} required/>
                <InputField type="text" placeholder="Los Angeles, CA" label="Location"  value={this.state.formData.jobLocation} name={"jobLocation"} change={this.changeHandler}/>

                <InputGroup inline title="Compensation">
                    <InputField type="number" placeholder="$0" label="From" value={this.state.formData.minCompensation} change={this.changeHandler} name={"minCompensation"}/>
                    <InputField type="number" placeholder="$0" label="To" value={this.state.formData.maxCompensation} change={this.changeHandler} name={"maxCompensation"}/>
                    <InputField type="switch" options={["Hourly", "Salary"]} value={this.state.formData.compensationType} change={this.changeHandler} name={"compensationType"}/>
                </InputGroup>

                <InputField type="dropdown" options={["Full-Time", "Part-time", "Temp", "Per-diem"]} value={this.state.formData.jobType} placeholder={"Job Type"} label={"Job Type"} change={this.changeHandler} name={"jobType"}/>
                <InputField type="text" placeholder="Warehouse, Clerical" label="Job Category" value={this.state.formData.jobCategory} change={this.changeHandler} name={"jobCategory"}/>
                <InputField type="textarea" placeholder="Required Skills, Experience, etc." value={this.state.formData.jobDescription} label="Job Description" change={this.changeHandler} name={"jobDescription"}/>
            
                <Button click={this.submitFormHandler}>Post</Button>
            </form>
        );
    }


}

export default JobCreatorForm;