import React from 'react';
import Link from 'next/link';
import variables from '../../components/common/globalVariables';
import Layout from '../../components/common/Layout/Layout';
import PageSection from '../../components/common/Layout/PageSection';
import LoginForm from '../../components/users/LoginForm/LoginForm';
// import classes from './login.module.scss';

const friendsImgUrl = '../../static/images/friends-with-bg.png';
const pageStyles = ` background-color: ${variables.mutedColor1};
                    padding: 30px;
                    display: flex;
                    flex-direction: column;`;

const login = () => {

    return(<Layout title={"Login"}>
            <PageSection styles={pageStyles}>

                <LoginForm />
               
                <Link href="/users/recover">
                    <a className="forgoPasswordLink">Forgot Password?</a>
                </Link>
                <p>
                    Don't have an account? 
                    <Link href="/users/register">
                        <a> Sign Up</a>
                    </Link>
                </p>
                <img src={friendsImgUrl} />
            </PageSection>
            <style jsx>{`
            
                    img {
                        width: 100%;
                        max-width: 400px;
                    }

                    .forgoPasswordLink {
                        margin-bottom: 50px;
                    }
            
                    a , p {
                        font-size: 0.8em;
                    }
            `}</style>
        </Layout>);
};

export default login;