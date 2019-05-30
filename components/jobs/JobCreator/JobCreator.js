import React from 'react';

import Title from '../../common/UI/Title/Title';
import classes from './JobCreator.module.scss';
import JobCreatorForm from './JobCreatorForm/JobCreatorForm';

const jobCreator = () => {
    return (
        <div className={classes.JobCreator}>

            <Title>Post a Job</Title>
            <p className={classes.Instructions}>Please enter the information for the new job listing</p>
            <JobCreatorForm/>

        </div>
    );
};

export default jobCreator;