import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout/Layout";

// import classes from './index.module.scss';
import axios from "../data/api";
import UserLocator from "../data/UserLocator";
import variables from "../components/common/globalVariables.js";
import { randomInt } from "../lib/random";

import PageSection from "../components/common/Layout/PageSection";
import Container from "../components/common/Layout/Container";
import Title from "../components/common/UI/Title";
import DynamicImageBg from "../components/common/UI/DynamicImageBg";
import SearchArea from "../components/jobs/Search/SearchArea";

import JobList from "../components/jobs/JobList/JobList";

// const peopleImage = "../static/images/334809-PAIXKS-603.ai.png";
const landingLogo = "../static/images/LandingLogo.svg";

// const homePageStyle = `background: linear-gradient(0deg, white 40%, ${variables.mutedColor1} 40%);`;

const homePage = props => {
  const [userLocation, setUserLocation] = useState({
    name: "Loading...",
    lat: 0,
    lon: 0
  });
  const [jobs, setJobs] = useState([]);
  const userLocator = new UserLocator();

  useEffect(() => {
    userLocator.getLocation().then(res => {
      setUserLocation(res);
    });
  }, []);

  useEffect(() => {
    if (userLocation.name !== "Loading...") {
      axios.get(`/jobs?location=${userLocation.name}&page=${1}`).then(res => {
        setJobs(res.data);
      });
    }
  }, [userLocation.name]);

  return (
    <Layout title={"Home Page"} data-test="indexPage">
      <PageSection className="HomePage" column>
        <DynamicImageBg
          query={
            jobs.length > 0 ? jobs[randomInt(0, jobs.length)].location : ""
          }
        >
          <Container>
            <div className="Logos">
              <img src={landingLogo} className="CompanyLogo" />
            </div>
            <SearchArea location={userLocation.name} />
          </Container>
        </DynamicImageBg>
        <Container>
          <Title size={"m"} center>
            What's Poppin' 😎
          </Title>
          <JobList jobs={jobs} />
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
          margin: auto;
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
          .Logos,
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
