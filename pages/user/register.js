import React from "react";
import variables from "@/components/common/globalVariables";
import PageSection from "@/components/common/Layout/PageSection";
import RegisterForm from "@/components/users/RegisterForm";
import RenderIfLoggedOut from "@/components/hoc/RenderIfLoggedOut";
import Title from "@/components/common/UI/Title";
import Link from "next/link";

const friendsImgUrl = "../../images/friends-with-bg.png";
const pageStyles = ` background-color: ${variables.mutedColor1};
                padding: 30px;
                display: flex;
                flex-direction: column;`;

const registerPage = () => {
  return (
    <RenderIfLoggedOut redirect>
      <PageSection styles={pageStyles}>
        <Title center>Register</Title>
        <RegisterForm />
        <p>
          Already have an account?
          <Link href="/user/login">
            <a> Sign In</a>
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
