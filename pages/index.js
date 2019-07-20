import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout/Layout";

// import classes from './index.module.scss';
import SearchArea from "../components/jobs/Search/SearchArea";
import PageSection from "../components/common/Layout/PageSection";
import Container from "../components/common/Layout/Container";
import UserLocator from "../data/UserLocator";

import variables from "../components/common/globalVariables.js";
import JobList from "../components/jobs/JobList/JobList";

// const peopleImage = "../static/images/334809-PAIXKS-603.ai.png";
const landingLogo = "../static/images/LandingLogo.svg";

// const homePageStyle = `background: linear-gradient(0deg, white 40%, ${variables.mutedColor1} 40%);`;

const homePage = props => {
  const [userLocation, setUserLocation] = useState("Loading...");
  const userLocator = new UserLocator();

  useEffect(() => {
    userLocator.getLocation().then(res => {
      console.log(res);
    });
  }, []);

  return (
    <Layout title={"Home Page"} data-test="indexPage">
      <PageSection className="HomePage" column>
        <div className="Logos">
          <img src={landingLogo} className="CompanyLogo" />
        </div>

        <Container>
          <SearchArea location={userLocation} />
          <JobList />
        </Container>
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
          .PeopleLogo,
          .CompanyLogo {
            display: none;
          }
        }
      `}</style>
    </Layout>
  );
};

export default homePage;
