import React from "react";
import Link from "next/link";
import variables from "@/common/globalVariables";
import PageSection from "@/common/Layout/PageSection";
import LoginForm from "@/components/users/LoginForm";
import Title from "@/common/UI/Title";
import RenderIfLoggedOut from "@/components/hoc/RenderIfLoggedOut";
import appText from "@/lang/appText";

const friendsImgUrl = "../../images/friends-with-bg.png";
const pageStyles = `background-color: ${variables.mutedColor1};
                    padding: 30px;
                    display: flex;
                    flex-direction: column;`;

const loginPage = () => {
  return (
    <RenderIfLoggedOut redirect>
      <PageSection styles={pageStyles} center>
        <Title center capitalize>
          {appText.actions.login}
        </Title>
        <LoginForm />

        <Link href="/user/password/request">
          <a className="forgoPasswordLink Link">
            {appText.messages.password.forgot}
          </a>
        </Link>
        <p className="Link">
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
            text-transform: capitalize;
          }

          a,
          p {
            font-size: 1em;
          }

          a {
            font-weight: bold;
          }

          p a {
            font-size: 1em;
            font-weight: bold;
          }
        `}</style>
      </PageSection>
    </RenderIfLoggedOut>
  );
};

export default loginPage;
