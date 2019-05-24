import React from 'react'

import JobListing from '../../components/jobs/JobListing/JobListing';
import Layout from '../../components/common/Layout/Layout';
import PageSection from '../../components/common/Layout/PageSection/PageSection';


const show = () => (
    <Layout>
        <PageSection>
            <JobListing/>
        </PageSection>
    </Layout>
)

export default show