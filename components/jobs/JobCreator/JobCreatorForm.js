import React, {Component} from 'react';
import axios from 'axios';
// import classes from './JobCreatorForm.module.scss';
import InputField from '../../common/UI/Input/InputField';
import InputGroup from '../../common/UI/Input/InputGroup';
import Loader from '../../common/UI/Animated/Loader';
import ThumbsUp from '../../common/UI/Animated/ThumbsUp';
import Button from '../../common/UI/Button';

class JobCreatorForm extends Component {

    state = {
      formData: {
        jobTitle: {
              value: "",
              valid: false
        },
        jobLocation: {
            value: "",
            valid: false
        },
        minCompensation: {
            value: "",
            valid: false
        },
        maxCompensation: {
            value: "",
            valid: false
          },
        compensationType: {
            value: "",
            valid: false,
            options: ["Hourly", "Salary"]
        },
        jobType: {
            value: "",
            valid: false,
            options: ["Full-Time", "Part-time", "Temp", "Per-diem"]
        },
        jobCategory: {
            value: "",
            valid: false,
            options: ["Warehouse","Industrial","Software","Engineering","Medical"]
        },
        jobDescription: {
            value: "",
            valid: false
        },
          jobRequirements: {
            value: "",
            valid: false
        },
          jobQualifications: {
            value: "",
            valid: false
        },
          jobSkills: {
            value: "",
             valid: false,
              options: ["Excel", "Word", "Photoshop", "Adobe", "Something"]
          }
      },
      status: "filling",
      validate: false
    };

    changeHandler = (field,value,valid) => {
      this.setState(prevState => {
          return {
              ...prevState,
            formData: {
                ...prevState.formData,
                [field]: {
                    ...prevState.formData[field],
                    value: value,
                    valid: valid
                }
            }
          };
      });
    };

    submitFormHandler = (e) => {
        e.preventDefault();

        if(this.formIsValid()) {
            this.setState({status: "sending"});
            const jobData = {
                title: this.state.formData.jobTitle.value,
                location: this.state.formData.jobLocation.value,
                minCompensation: this.state.formData.minCompensation.value,
                maxCompensation: this.state.formData.maxCompensation.value,
                compensationType: this.state.formData.compensationType.value,
                category: this.state.formData.jobCategory.value,
                type: this.state.formData.jobType.value,
                description: this.state.formData.jobDescription.value,
                skills: this.state.formData.jobSkills.value,
                requirements: this.state.formData.jobRequirements.value,
                qualifications: this.state.formData.jobQualifications.value
            };

            axios.post("https://myexactjobsapi.herokuapp.com/api/jobs",jobData)
            .then(res=>{
                console.log(res);
                this.setState({status: "posted"});
            })
            .catch(err => {
                this.setState({status: "failed"});
                console.log(err.response)
            })
        } else {
            this.setState({validate: true});
            console.log("Invalid");
        }
    };

    formIsValid = () => {
        const invalid = Object.keys(this.state.formData).filter(key => {
            return !this.state.formData[key].valid;
        });

        console.log(invalid);

        return invalid.length === 0;
    };

    render() {
        let elementToRender = (
            <div className={"Center"}>
                <Loader />
                <h1>Posting...</h1>
            </div> 
        );

        if(this.state.status === "filling") {
            elementToRender = (
                <form className={"JobCreatorForm"}>
                    <InputField validate={this.state.validate} type="text" placeholder="Warehouse Manager" label="Job Title" value={this.state.formData.jobTitle.value} name={"jobTitle"} change={this.changeHandler} required/>
                    <InputField validate={this.state.validate} type="location" placeholder="Los Angeles, CA" label="Location"  value={this.state.formData.jobLocation.value} name={"jobLocation"} change={this.changeHandler} required/>

                    <InputGroup inline title="Compensation">
                        <InputField validate={this.state.validate} type="number" placeholder="$0" label="From" value={this.state.formData.minCompensation.value} change={this.changeHandler} name={"minCompensation"} required/>
                        <InputField validate={this.state.validate} type="number" placeholder="$0" label="To" value={this.state.formData.maxCompensation.value} change={this.changeHandler} name={"maxCompensation"} required/>
                        <InputField validate={this.state.validate} type="dropdown" options={this.state.formData.compensationType.options} placeholder={"Select an option"} label={"Compensation Type"} value={this.state.formData.compensationType.value} change={this.changeHandler} name={"compensationType"} required/>
                    </InputGroup>

                    <InputField validate={this.state.validate} type="tags" placeholder="Warehouse, Clerical" label="Job Category" options={this.state.formData.jobCategory.options} change={this.changeHandler} name={"jobCategory"} required/>
                    <InputField validate={this.state.validate} type="dropdown" options={this.state.formData.jobType.options} value={this.state.formData.jobType.value} placeholder={"Select an option"} label={"Job Type"} change={this.changeHandler} name={"jobType"} required/>
                    <InputField validate={this.state.validate} type="textarea" placeholder="Required Skills, Experience, etc." value={this.state.formData.jobDescription.value} label="Job Description" change={this.changeHandler} name={"jobDescription"} required/>
                    <InputField validate={this.state.validate} type="tags" placeholder="Please enter the job skills"  label="Skills" change={this.changeHandler} name={"jobSkills"} options={this.state.formData.jobSkills.options} required/>
                    <InputField validate={this.state.validate} type="richTextLimited" placeholder="Please enter the job requirements such as experience and education"  label="Job Requirements" change={this.changeHandler} name={"jobRequirements"} required/>
                    <InputField validate={this.state.validate}type="richTextLimited" placeholder="Please enter the job qualifications"  label="Job Qualifications" change={this.changeHandler} name={"jobQualifications"} required/>

                    <Button click={this.submitFormHandler}>Post</Button>
                    <style jsx>{`
                
                        form {
                            width: 100%;
                            flex-wrap: wrap;
                            padding-bottom: 30px;
                        }

                        .Center {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-direction: column;
                        }
                    `}</style>
                </form>
            );
        } else if(this.state.status === "posted") {
            elementToRender = (
                <div className={"Center"}>
                    <ThumbsUp />
                    <h1>Job Posted!</h1>
                </div> 
            );
        } else if (this.state.status === "failed") {
            elementToRender = (
                <div className={"Center"}>
                    <Loader />
                    <h1>Something went wrong</h1>
                </div>);
        }

        return (
            <React.Fragment>
                {elementToRender}
                <style jsx global>{`
                    .Center {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                      }
                `}</style>
            </React.Fragment>
        );
    }


}

export default JobCreatorForm;