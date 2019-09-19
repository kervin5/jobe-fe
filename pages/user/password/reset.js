import React from "react";
import Link from "next/link";
import variables from "../../../components/common/globalVariables";
import PageSection from "../../../components/common/Layout/PageSection";
import PasswordResetForm from "../../../components/users/PasswordResetForm";
import Title from "../../../components/common/UI/Title";

const friendsImgUrl = "../../static/images/friends-with-bg.png";

const PasswordResetPage = props => {
  return (
    <PageSection column>
      <Title center>Enter New Password</Title>
      <PasswordResetForm token={props.query.resetToken} />

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

export default PasswordResetPage;
