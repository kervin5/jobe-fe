import React from "react";
import variables from "../../components/common/globalVariables";
import PageSection from "../../components/common/Layout/PageSection";
import RegisterForm from "../../components/users/RegisterForm/RegisterForm";
import HiddenIfAuth from "../../components/hoc/HiddenIfAuth";

const friendsImgUrl = "../../static/images/friends-with-bg.png";
const pageStyles = ` background-color: ${variables.mutedColor1};
                padding: 30px;
                display: flex;
                flex-direction: column;`;

const register = () => {
  return (
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
  );
};

export default HiddenIfAuth(register, "/dashboard");
