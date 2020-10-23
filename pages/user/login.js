import React from "react";
import Link from "next/link";
import variables from "@/common/globalVariables";
import PageSection from "@/common/Layout/PageSection";
import LoginForm from "@/components/users/LoginForm";
import Title from "@/common/UI/Title";
import RenderIfLoggedOut from "@/components/hoc/RenderIfLoggedOut";
import appText from "@/lang/appText";
import SEO from "@/components/SEO";

const friendsImgUrl = "../../images/friends-with-bg.png";

const loginPage = () => {
  return (
    <>
      <SEO
        description={`${appText.seo.pages.login.description}. ${appText.seo.description}!`}
        title={`${appText.actions.login} - ${appText.seo.title}! `}
      />
      <RenderIfLoggedOut redirect>
        <PageSection center>
          <div>
            <Title level={2} center capitalize>
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
          </div>
        </PageSection>
      </RenderIfLoggedOut>
    </>
  );
};

export default loginPage;
