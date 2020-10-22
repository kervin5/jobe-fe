import React from "react";
import SEO from "@/components/SEO";
import appText from "@/lang/appText";
import PageSection from "@/common/Layout/PageSection";
import Container from "@/common/Layout/Container";
import Title from "@/common/UI/Title";
import LandingSection from "@/common/Layout/LandingSection";
import { basePath } from "@/root/config";
import JobsCards from "@/components/jobs/JobList/JobsListQuery";
import PopularTerms from "@/components/jobs/PopularTerms/PopularTerms";
import { getJobsFromAPI, getTermsFromAPI } from "@/lib/backend";

// const homePageStyle = `background: linear-gradient(0deg, white 40%, ${variables.mutedColor1} 40%);`;

const homePage = (props) => {
  // return <p>Hello</p>;

  return (
    <PageSection className="HomePage" data-test="indexPage">
      <SEO
        description={`${appText.seo.pages.landing.description}. ${appText.seo.description}!`}
        title={`${appText.seo.title}!`}
      />

      <LandingSection />
      <PageSection>
        <Container>
          <Title size={"l"} center margin capitalize>
            {appText.messages.whatsTrending} 😎
          </Title>
          <PopularTerms terms={props.terms} />
          <Title size={"l"} center margin capitalize>
            {appText.messages.job.latest}
          </Title>
          <JobsCards jobs={props.jobs} />
        </Container>
      </PageSection>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "${basePath}/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "${basePath}/jobs?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }`,
        }}
      />
    </PageSection>
  );
};

export async function getStaticProps() {
  const jobs = await getJobsFromAPI();
  const terms = await getTermsFromAPI();

  return { props: { jobs, terms }, revalidate: 1 };
}

export default homePage;
