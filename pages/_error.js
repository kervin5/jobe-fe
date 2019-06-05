import React from 'react';
import Layout from '../components/common/Layout/Layout.js';
// import classes from '../static/genericStyles/_error.module.scss';



import PageSection from '../components/common/Layout/PageSection/PageSection.js';

// Page: Landing Page
const peopleImage = '../static/images/334809-PAIXKS-603.ai.png';

const pageStyles = `background: linear-gradient(0deg, rgba(255,255,255,1) 40%, rgba(244,244,244,1) 40%);
flex-wrap: wrap;
align-items: flex-start;
align-content: center;`;

const unknownPage = (props) => {
    return (
        <Layout>
            <PageSection styles={pageStyles}>
                <h1 className={"ErrorCode"}>404</h1>
                <img src={peopleImage} alt=""/>
                <h2 className={"Message"}>Oops, nothing to see here...</h2>
            </PageSection>
            <style jsx>{`
                .ErrorCode {
                    font-size: 19em;
                    color: #2B2D42;
                    position: relative;
                    opacity: 0.5;
                    transform: scale(1.5);
                  }
                
                .Message {
                    width: 100%;
                    text-align: center;
                    font-size: 4em;
                    color: #71697A;
                }

                img {
                    z-index: 2;
                }
            `}</style>
        </Layout>
    );
};

export default unknownPage;