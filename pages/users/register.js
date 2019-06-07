import React from 'react';
import variables from '../../components/common/globalVariables';
import Layout from '../../components/common/Layout/Layout';
import PageSection from '../../components/common/Layout/PageSection';
import RegisterForm from '../../components/users/RegisterForm/RegisterForm';


const friendsImgUrl = '../../static/images/friends-with-bg.png';
const pageStyles = ` background-color: ${variables.mutedColor1};
                padding: 30px;
                display: flex;
                flex-direction: column;`;
                
const register = () => {
    return(
        <Layout>
            <PageSection styles={pageStyles}> 
                <RegisterForm/><br />
                <img src={friendsImgUrl}/>
            </PageSection>

            <style jsx>{`
                img {
                    width: 210px;
                    opacity: 0.3;
                
                }
            `}</style >
        </Layout>
    );
}

export default register;