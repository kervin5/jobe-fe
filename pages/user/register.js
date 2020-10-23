import React from "react";
import variables from "@/common/globalVariables";
import PageSection from "@/common/Layout/PageSection";
import RegisterForm from "@/components/users/RegisterForm";
import RenderIfLoggedOut from "@/components/hoc/RenderIfLoggedOut";
import Title from "@/common/UI/Title";
import Link from "next/link";
import appText from "@/lang/appText";
import SEO from "@/components/SEO";
const friendsImgUrl = "../../images/friends-with-bg.png";

const registerPage = () => {
  return (
    <>
      <SEO
        description={`${appText.seo.pages.register.description}. ${appText.seo.description}!`}
        title={`${appText.actions.register} - ${appText.seo.title}!`}
      />
      <RenderIfLoggedOut redirect>
        <PageSection center>
          <div>
            <Title level={2} center capitalize>
              {appText.actions.register}
            </Title>
            <RegisterForm />
            <p>
              {appText.messages.account.alreadyhave}
              <Link href="/user/login">
                <a> {appText.actions.login}</a>
              </Link>
            </p>
            <br />
            <img src={friendsImgUrl} />
            <style jsx>{`
              img {
                width: 200px;
              }
            `}</style>
          </div>
        </PageSection>
      </RenderIfLoggedOut>
    </>
  );
};

export default registerPage;
