import React from 'react'

import Layout from '../../components/common/Layout/Layout';
import PageSection from '../../components/common/Layout/PageSection/PageSection';
import classes from './index.module.scss';
import JobList from '../../components/jobs/JobList/JobList';




const show = () => (
    <Layout>
        <PageSection className={classes.JobsPage}>
            <JobList/>
        </PageSection>
    </Layout>
)

export default show