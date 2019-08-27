import React from "react";
import variables from "../../components/common/globalVariables";
import PageSection from "../../components/common/Layout/PageSection";
import RegisterForm from "../../components/users/RegisterForm/RegisterForm";
import { redirectIfAuth } from "../../lib/withAuth";

const friendsImgUrl = "../../static/images/friends-with-bg.png";
const pageStyles = ` background-color: ${variables.mutedColor1};
                padding: 30px;
                display: flex;
                flex-direction: column;`;

const registerPage = () => {
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

registerPage.getInitialProps = async function(props) {
  await redirectIfAuth(props);
};

export default registerPage;
