import React from 'react'
import Layout from '../../components/common/Layout/Layout';
import classes from './index.module.scss';
import JobList from '../../components/jobs/JobList/JobList';



import PageSection from '../../components/common/Layout/PageSection/PageSection';


const show = () => (
    <Layout>
        <PageSection className={classes.JobsPage}>
            <div className={classes.Container}>
                <JobList/>
            </div>
        </PageSection>
    </Layout>
)

export default show