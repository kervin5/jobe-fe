import React from "react";
import Link from "next/link";
import variables from "../../components/common/globalVariables";
import PageSection from "../../components/common/Layout/PageSection";
import LoginForm from "../../components/users/LoginForm";
import Title from "../../components/common/UI/Title";
import WithoutAuth from "../../components/hoc/WithoutAuth";

const friendsImgUrl = "../../static/images/friends-with-bg.png";
const pageStyles = `background-color: ${variables.mutedColor1};
                    padding: 30px;
                    display: flex;
                    flex-direction: column;`;

const loginPage = () => {
  return (
    <PageSection styles={pageStyles}>
      <Title center>Login</Title>
      <LoginForm />

      <Link href="/user/login">
        <a className="forgoPasswordLink">Forgot Password?</a>
      </Link>
      <p>
        Don't have an account?
        <Link href="/user/register">
          <a> Sign Up</a>
        </Link>
      </p>
      <div className="BgImage">
        <img src={friendsImgUrl} />
      </div>
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

        // a {
        //   color: ${variables.accentColor1};
        // }

        p a {
          font-size: 1em;
          font-weight: bold;
        }
      `}</style>
    </PageSection>
  );
};

export default WithoutAuth(loginPage);
