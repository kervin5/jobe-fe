import React, {useState, useEffect} from 'react';
import axios from 'axios';
import JobListItem from './JobListItem';
import Loader from '../../common/UI/Animated/Loader';

const jobList = () => {
    const [jobs,setJobs] = useState([]);
    let elementToRender = <Loader />;

    useEffect(()=>{
        axios.get('https://myexactjobsapi.herokuapp.com/api/jobs')
        .then(res => {
            setJobs(res.data);
            console.log(res);
        })
    },[]);

    if(jobs.length > 0 ){
        elementToRender = jobs.map(job => {
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
        <div >
            {elementToRender}
        </div>
    );
};

export default jobList;