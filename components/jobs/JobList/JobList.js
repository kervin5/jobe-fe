import React, {useState, useEffect} from 'react';
import axios from 'axios';
import JobListItem from './JobListItem';

const jobList = () => {
    const [jobs,setJobs] = useState([]);

    useEffect(()=>{
        axios.get('https://myexactjobsapi.herokuapp.com/api/jobs')
        .then(res => {
            setJobs(res.data);
            console.log(res);
        })
    },[]);

    const cards = jobs.map(job => {
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

    return(
        <div>
            {cards}
        </div>
    );
};

export default jobList;