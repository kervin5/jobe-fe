import React from 'react';
import Link from 'next/link';
import Layout from '../../components/common/Layout/Layout';
import PageSection from '../../components/common/Layout/PageSection/PageSection';
import LoginForm from '../../components/users/LoginForm/LoginForm';
// import classes from './login.module.scss';

const friendsImgUrl = '../../static/images/friends-with-bg.png';

const login = () => {

    return(<Layout title={"Login"}>
            <PageSection className={classes.LoginPage}>
                <LoginForm />
               
                <Link href="/users/recover">
                    <a>Forgot Password?</a>
                </Link>
                <p>
                    Don't have an account? 
                    <Link href="/users/register">
                        <a> Sign Up</a>
                    </Link>
                </p>
                <img src={friendsImgUrl} />
               
            </PageSection>
        </Layout>);
};

export default login;