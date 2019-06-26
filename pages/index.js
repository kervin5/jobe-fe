import React from "react";
import Layout from "../components/common/Layout/Layout";

// import classes from './index.module.scss';
import SearchForm from "../components/jobs/Search/SearchForm";
import PageSection from "../components/common/Layout/PageSection";
import variables from "../components/common/globalVariables.js";

const peopleImage = "../static/images/334809-PAIXKS-603.ai.png";
const landingLogo = "../static/images/LandingLogo.svg";

const homePageStyle = `background: linear-gradient(0deg, white 40%, ${variables.mutedColor1} 40%);`;

const homePage = props => {
  return (
    <Layout title={"Home Page"}>
      <PageSection styles={homePageStyle} className="HomePage" column>
        <div className="Logos">
          <img src={landingLogo} className="CompanyLogo" />
        </div>
        <SearchForm />
        <div className="PeopleLogo">
          <img src={peopleImage} />
        </div>
      </PageSection>
      <style jsx>{`
        .Logos {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 700px;
          padding: 20px 30px;
        }

        .Logos img {
          width: 100%;
        }

        .CompanyLogo {
          margin-bottom: 15px;
        }

        .PeopleLogo {
          width: 100%;
          max-width: 460px;
        }

        .PeopleLogo img {
          width: 100%;
        }

        @media (max-width: ${variables.mediumScreen}) {
          .PeopleLogo {
            max-width: 190px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default homePage;
