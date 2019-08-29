import React from "react";
import variables from "../../components/common/globalVariables";
import PageSection from "../../components/common/Layout/PageSection";
import RegisterForm from "../../components/users/RegisterForm";
import RedirectIfAuth from "../../components/hoc/RedirectIfAuth";

const friendsImgUrl = "../../static/images/friends-with-bg.png";
const pageStyles = ` background-color: ${variables.mutedColor1};
                padding: 30px;
                display: flex;
                flex-direction: column;`;

const registerPage = () => {
  return (
    <RedirectIfAuth>
      <PageSection styles={pageStyles}>
        <RegisterForm />
        <br />
        <img src={friendsImgUrl} />
        <style jsx>{`
          img {
            width: 310px;
            opacity: 0.3;
          }
        `}</style>
      </PageSection>
    </RedirectIfAuth>
  );
};

export default registerPage;
