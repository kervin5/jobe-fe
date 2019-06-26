import React from "react";
import Link from "next/link";
import variables from "../../components/common/globalVariables";
import Layout from "../../components/common/Layout/Layout";
import PageSection from "../../components/common/Layout/PageSection";
import LoginForm from "../../components/users/LoginForm/LoginForm";
import HiddenIfAuth from "../../components/hoc/HiddenIfAuth";

const friendsImgUrl = "../../static/images/friends-with-bg.png";
const pageStyles = ` background-color: ${variables.mutedColor1};
                    padding: 30px;
                    display: flex;
                    flex-direction: column;`;

const login = () => {
  return (
    <Layout title={"Login"}>
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
        <div className="BgImage">
          <img src={friendsImgUrl} />
        </div>
      </PageSection>
      <style jsx>{`
        .BgImage {
          width: 100%;
          max-width: 400px;
        }

        .BgImage img {
          width: 100%;
        }

        .forgoPasswordLink {
          margin-bottom: 50px;
        }

        a,
        p {
          font-size: 0.8em;
        }

        a {
          color: ${variables.accentColor1};
        }

        p a {
          font-size: 1em;
          font-weight: bold;
        }
      `}</style>
    </Layout>
  );
};

export default HiddenIfAuth(login, "/dashboard");
// export default login;

// export default () => <p>Login</p>
