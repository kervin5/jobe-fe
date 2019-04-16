import React from 'react'
import classes from './new.module.scss';
import PageSection from '../../components/common/Layout/PageSection/PageSection';
import Layout from '../../components/common/Layout/Layout';
import JobCreator from '../../components/jobs/JobCreator/JobCreator.js';

const homePage = (props) => {
    return (
        <Layout title={"New Job"}>
            <PageSection className={classes.HomePage}>
                <JobCreator/>
            </PageSection>
        </Layout>
    );
};

export default homePage;
