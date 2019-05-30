import React, { useState, useEffect } from 'react';
import { withRouter } from "next/router";
import axios from 'axios';

import Layout from '../../components/common/Layout/Layout';
import PageSection from '../../components/common/Layout/PageSection/PageSection';
import JobListing from '../../components/jobs/JobListing/JobListing';


const single = (props) => {


    const [singleJob, setSingleJob] = useState({});

    useEffect(() => {
        const { router: { query: { slug } }} = props;
        const jobId = slug.split("-").pop();
        console.log(jobId);

        axios.get('https://myexactjobsapi.herokuapp.com/api/jobs/'+jobId)
            .then(response => {
                setSingleJob(response.data);
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
        },[])

    return(
        <Layout>
        <PageSection>
            <JobListing 
                title={singleJob.title}
                location={singleJob.location}
                business={"Target"}
                about={""}
                description={singleJob.description}
            />
        </PageSection>
    </Layout>
    )
}

export default withRouter(single);