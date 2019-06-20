import React, {useState, useEffect} from 'react';
import axios from 'axios';
import JobListItem from './JobListItem';
import Loader from '../../common/UI/Animated/Loader';

const jobList = (props) => {
    let elementToRender = <Loader />;

    if(props.jobs.length > 0 ){
        elementToRender = props.jobs.map(job => {
            return <JobListItem 
            key={job._id} 
            title={job.title} 
            description={job.description} 
            location={job.location}
            compensation={job.minCompensation}
            type={job.type}
            id={job._id}
            />
        });
    }
    

    return(
        <React.Fragment>
            <div >
                {elementToRender}
            </div>
            <style jsx>{`
                
                div {
                    padding: 30px;
                }

                `}</style>
        </React.Fragment>
    );
};

export default jobList;