import React from 'react';
import classes from './genericStyles/_error.module.scss';
import PageSection from '../components/common/Layout/PageSection/PageSection.js';
import Layout from '../components/common/Layout/Layout.js';
// Page: Landing Page
const peopleImage = '../static/images/334809-PAIXKS-603.ai.png';

const unknownPage = (props) => {
    return (
        <Layout>
            <PageSection className={classes.UnknownPage}>
                <h1 className={classes.ErrorCode}>404</h1>
                <img src={peopleImage} alt=""/>
                 <h2 className={classes.Message}>Oops, nothing to see here...</h2>
            </PageSection>
        </Layout>
    );
};

export default unknownPage;