import React from "react";
import variables from "@/common/globalVariables";
import PageSection from "@/common/Layout/PageSection";
import RegisterForm from "@/components/users/RegisterForm";
import RenderIfLoggedOut from "@/components/hoc/RenderIfLoggedOut";
import Title from "@/common/UI/Title";
import Link from "next/link";
import appText from "@/lang/appText";

const friendsImgUrl = "../../images/friends-with-bg.png";
const pageStyles = ` background-color: ${variables.mutedColor1};
                padding: 30px;
                display: flex;
                flex-direction: column;`;

const registerPage = () => {
  return (
    <RenderIfLoggedOut redirect>
      <PageSection styles={pageStyles} center>
        <Title center capitalize>
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
      </PageSection>
    </RenderIfLoggedOut>
  );
};

export default registerPage;
