import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import variables from "@/common/globalVariables";
import PageSection from "@/common/Layout/PageSection";
import PasswordResetForm from "@/components/users/PasswordResetForm";
import Title from "@/common/UI/Title";
import appText from "@/lang/appText";

const friendsImgUrl = "../../images/friends-with-bg.png";
const pageStyles = `padding: 30px;`;

const PasswordResetPage = (props) => {
  const router = useRouter();

  if (!router?.query?.resetToken)
    return (
      <p>
        {appText.messages.account.clickToReset}:{" "}
        <Link href="/user/password/request">
          <a>
            {appText.actions.click} {appText.adjectives.here}
          </a>
        </Link>
      </p>
    );

  return (
    <PageSection styles={pageStyles} center column>
      <Title center>{appText.messages.account.enterNewPassword}</Title>
      <PasswordResetForm token={router?.query?.resetToken} />

      <p>
        {appText.messages.account.donthave}
        <Link href="/user/register">
          <a> {appText.actions.register}</a>
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
