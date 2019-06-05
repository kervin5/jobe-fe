import React from 'react';
import variables from '../../components/common/globalVariables';
import Layout from '../../components/common/Layout/Layout';
// import classes from './index.module.scss';
import JobList from '../../components/jobs/JobList/JobList';
import PageSection from '../../components/common/Layout/PageSection/PageSection';

const styles = `background-color: ${variables.mutedColor1};`

const show = () => (
    <Layout>
        <PageSection styles={styles}>
            <div className="Container">
                <JobList/>
            </div>
        </PageSection>
        <style jsx>{`
            .Container {
                max-width: 600px;
            }
        `}</style>
    </Layout>
)



export default show