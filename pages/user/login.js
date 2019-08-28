import React from "react";
import Link from "next/link";
import variables from "../../components/common/globalVariables";
import PageSection from "../../components/common/Layout/PageSection";
import LoginForm from "../../components/users/LoginForm/LoginForm";
import { redirectIfAuth } from "../../lib/withAuth";
import { AUTHORIZE_USER } from "../../lib/withAuth";

const friendsImgUrl = "../../static/images/friends-with-bg.png";
const pageStyles = `background-color: ${variables.mutedColor1};
                    padding: 30px;
                    display: flex;
                    flex-direction: column;`;

const loginPage = () => {
  return (
    <PageSection styles={pageStyles}>
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

loginPage.getInitialProps = async props => {
  if (!!(await hasSignedIn(props))) {
    redirect("/dashboard", props.res);
  }
  return {};
  // console.log(Object.keys(props));
  // return await redirectIfAuth(props);
};

const redirect = (url, res) => {
  if (res) {
    res.writeHead(302, {
      Location: url
    });
    res.end();
  } else {
    Router.push(url);
  }
};

export async function hasSignedIn({ apolloClient }) {
  const { data } = await apolloClient.query({ query: AUTHORIZE_USER });
  return data.authorize;
}

export default loginPage;
