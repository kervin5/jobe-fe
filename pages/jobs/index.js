import React, { useState } from "react";
import { useRouter } from "next/router";
import variables from "@/common/globalVariables";
import PageSection from "@/common/Layout/PageSection";
import SearchFieldSection from "@/components/jobs/Search/SearchFieldSection";
import Button from "@/common/UI/Button";
import ButtonGroup from "@/common/UI/ButtonGroup";
import Jobs from "@/components/jobs/JobList/JobsListQuery";
import SearchFilters from "@/components/jobs/Search/SearchFilters";
import SEO from "@/components/SEO";
import { basePath } from "@/root/config";
import appText from "@/lang/appText";

const styles = `background-color: ${variables.mutedColor1}; padding: 30px; align-items: flex-start;`;

const SearchPage = (props) => {
  const [variables, setVariables] = useState({
    distance: 10,
    category: "",
    type: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const handleFiltersChange = (vars) => {
    setVariables({
      ...variables,
      ...vars,
    });
  };
  const router = useRouter();
  const { q, location, category } = router.query;

  return (
    <>
      <SEO
        description={`${appText.seo.pages.jobSearch.description}. ${appText.seo.description}!`}
        title={`${q || category || appText.messages.currentlyOpen} ${
          appText.objects.job.plural
        } ${appText.adjectives.near} ${
          location ? location : appText.pronouns.you
        } - ${appText.seo.pages.jobSearch.title}`}
      />
      <SearchFilters
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        onChange={handleFiltersChange}
      />
      <PageSection styles={styles}>
        <div className="Container">
          <SearchFieldSection terms={q ?? category} location={location} />
          <ButtonGroup>
            {/* <Button size={{ height: "30px" }} icon="alarm">
              Add Alert
            </Button> */}
            <Button
              size={{ height: "30px" }}
              icon="filter"
              color="2"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filter
            </Button>
          </ButtonGroup>
          <Jobs
            location={location}
            q={q}
            category={category || variables.category}
            type={variables.type}
            radius={parseInt(variables.distance)}
          />
        </div>
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
      <style jsx>{`
        .Container {
          max-width: 600px;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default SearchPage;
