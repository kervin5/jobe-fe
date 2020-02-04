import React, { useEffect, useState } from "react";
import SEO from "../components/SEO";
import UserLocator from "../data/UserLocator";
import variables from "../components/common/globalVariables.js";

import PageSection from "../components/common/Layout/PageSection";
import Container from "../components/common/Layout/Container";
import Title from "../components/common/UI/Title";
import DynamicImageBg from "../components/common/UI/DynamicImageBg";
import SearchArea from "../components/jobs/Search/SearchArea";

import Jobs from "../components/jobs/Jobs";
import PopularTerms from "../components/jobs/PopularTerms/PopularTerms";

// const peopleImage = "../static/images/334809-PAIXKS-603.ai.png";
const landingLogo = "../static/images/LandingLogo.svg";

// const homePageStyle = `background: linear-gradient(0deg, white 40%, ${variables.mutedColor1} 40%);`;

const homePage = props => {
  const [userLocation, setUserLocation] = useState({
    name: "Loading...",
    lat: 0,
    lon: 0
  });

  const userLocator = new UserLocator();

  useEffect(() => {
    userLocator.getLocation().then(res => {
      setUserLocation(res);
    });
  }, []);

  return (
    <PageSection className="HomePage" column nopadding data-test="indexPage">
      <SEO
        description="Start your job search with myexactjobs. Browse through hundreds of job openings nationally. Exact Staff has the job opportunity you have been looking for so Apply Today!"
        title="Exact Staff National Job Board: Find a Job Today! "
      />
      <DynamicImageBg
        staticImage
        query={
          userLocation.name !== "Loading..."
            ? userLocation.country || userLocation.name
            : "Los Angeles, CA"
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
        <Title size={"l"} center margin>
          What's Trending 😎
        </Title>
        <PopularTerms />
        <Title size={"l"} center margin>
          Latest Jobs
        </Title>
        <Jobs />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://www.myexactjobs.com/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.myexactjobs.com/jobs?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }`
        }}
      />
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
    </PageSection>
  );
};

export default homePage;
