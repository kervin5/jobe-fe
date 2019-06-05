import React from 'react';

// import classes from './JobCreator.module.scss';
import JobCreatorForm from './JobCreatorForm';
import Title from '../../common/UI/Title';


const jobCreator = () => {
    return (
        <div className={"JobCreator"}>

            <Title>Post a Job</Title>
            <p className={"Instructions"}>Please enter the information for the new job listing</p>
            <JobCreatorForm/>
            <style jsx>{`
                div {
                    width: 100%;
                }

                .Instructions {
                    margin-bottom: 15px;
                  }
            `}</style>
        </div>
    );
};

export default jobCreator;