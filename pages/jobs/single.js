import React, { useState, useEffect } from 'react';
import { withRouter } from "next/router";
import axios from 'axios';

import Layout from '../../components/common/Layout/Layout';
import PageSection from '../../components/common/Layout/PageSection/PageSection';
import JobListing from '../../components/jobs/JobListing/JobListing';


const show = ({ url: { query: { slug } } }) => {
    
    // const jobQualifications = 
    // ["High school diploma or General Education Development (GED) or equivalent", 
    // "3 months' warehouse experience", 
    // "3 months' experience operating an electric pallet jack or forklift", 
    // "Previous experience at Sysco or in foodservice industry"];

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
                about={singleJob.description}
                description={singleJob.description}
                minAmount={singleJob.minCompensation}
                maxAmount={singleJob.maxCompensation}
                type={singleJob.type}
                aboutCompany={"Under the direction of the Nurse Manager and attending physicians, act as a Medical Scribe and provide electronic medical record and phone support services related to patient care. Duties will include transcribing medical data quickly and accurately while patients are being examined, preparing electronic charts in advance and during visits for new and established patients by entering referring and other treating Doctors(s) contact information/care team, entering orders and referrals, and all medical information relevant to the office visit, take patient history, review of systems, physical exam findings, symptoms and complaints, progress notes, procedure notes, follow up lab and diagnostic orders and results. Position also includes phone support in clinic, and relaying messages to/from clinical teams, patients, and transcribing into EHR as needed."}
                // jobQualifications={jobQualifications}
            />
        </PageSection>
    </Layout>
    )
}

export default withRouter(single);