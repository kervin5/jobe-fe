import React, { useEffect, useState } from "react";
import SEO from "@/components/SEO";
import UserLocator from "../data/UserLocator";
import variables from "@/common/globalVariables.js";
import appText from "@/lang/appText";
import PageSection from "@/common/Layout/PageSection";
import Container from "@/common/Layout/Container";
import Title from "@/common/UI/Title";
import DynamicImageBg from "@/common/UI/DynamicImageBg";
import SearchArea from "@/components/jobs/Search/SearchArea";

import JobsCards from "@/components/jobs/JobsCards";
import PopularTerms from "@/components/jobs/PopularTerms/PopularTerms";
import { getJobsFromAPI, getTermsFromAPI } from "@/lib/backend";

const landingLogo = "/images/LandingLogo.svg";

// const homePageStyle = `background: linear-gradient(0deg, white 40%, ${variables.mutedColor1} 40%);`;

const homePage = props => {
  // return <p>Hello</p>;
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
          {appText.expressions.whatsTrending} 😎
        </Title>
        <PopularTerms terms={props.terms} />
        <Title size={"l"} center margin capitalize>
          {appText.expressions.latestJobs}
        </Title>
        <JobsCards jobs={props.jobs} />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://bolsa-de-trabajo.vercel.app/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://bolsa-de-trabajo.vercel.app/jobs?q={search_term_string}",
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

export async function getStaticProps() {
  const jobs = await getJobsFromAPI();
  const terms = await getTermsFromAPI();

  return { props: { jobs, terms }, unstable_revalidate: 1 };
}

export default homePage;
