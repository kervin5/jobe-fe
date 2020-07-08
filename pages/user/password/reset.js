import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import variables from "@/common/globalVariables";
import PageSection from "@/common/Layout/PageSection";
import PasswordResetForm from "@/components/users/PasswordResetForm";
import Title from "@/common/UI/Title";

const friendsImgUrl = "../../images/friends-with-bg.png";
const pageStyles = `padding: 30px;`;

const PasswordResetPage = props => {
  const router = useRouter();

  useEffect(() => {
    const { resetToken } = router.query;
    if (!resetToken) return router.push("/user/password/request");
  }, [router.query]);

  if (!router?.query?.resetToken) return null;

  return (
    <PageSection column styles={pageStyles}>
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
