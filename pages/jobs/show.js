import React from 'react'

import JobListing from '../../components/jobs/JobListing/JobListing'
import PageSection from '../../components/common/Layout/PageSection/PageSection';
import Layout from '../../components/common/Layout/Layout';

const show = () => (
    <Layout>
        <PageSection>
            <JobListing/>
        </PageSection>
    </Layout>
)

export default show