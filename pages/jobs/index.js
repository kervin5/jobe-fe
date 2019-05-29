import React from 'react'


import classes from './index.module.scss';
import Layout from '../../components/common/Layout/Layout';
import PageSection from '../../components/common/Layout/PageSection/PageSection';
import JobList from '../../components/jobs/JobList/JobList';


const show = () => (
    <Layout>
        <PageSection className={classes.JobsPage}>
            <JobList/>
        </PageSection>
    </Layout>
)

export default show