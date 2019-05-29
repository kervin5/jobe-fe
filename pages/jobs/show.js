import React from 'react'

import JobListing from '../../components/jobs/JobListing/JobListing';
import Layout from '../../components/common/Layout/Layout';
import PageSection from '../../components/common/Layout/PageSection/PageSection';


const jobQualifications = ["High school diploma or General Education Development (GED) or equivalent", 
                    "3 months' warehouse experience", 
                    "3 months' experience operating an electric pallet jack or forklift", 
                    "Previous experience at Sysco or in foodservice industry"]

const show = () => (
    <Layout>
        <PageSection>
            <JobListing 
                title={"Warehouse"}
                location={"San Fernando"}
                business={"Target"}
                about={""}
                description={""}
                jobQualifications={jobQualifications}
            />
        </PageSection>
    </Layout>
)

export default show