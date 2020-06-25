import React, { useState } from "react";
import { withRouter, useRouter } from "next/router";
import variables from "@/components/common/globalVariables";
import PageSection from "@/components/common/Layout/PageSection";
import SearchFieldSection from "@/components/jobs/Search/SearchFieldSection";
import Button from "@/components/common/UI/Button";
import ButtonGroup from "@/components/common/UI/ButtonGroup";
import Jobs from "@/components/jobs/JobsCards";
import SearchFilters from "@/components/jobs/Search/SearchFilters";
import SEO from "@/components/SEO";

const styles = `background-color: ${variables.mutedColor1}; padding: 30px; align-items: flex-start;`;

const SearchPage = props => {
  const [variables, setVariables] = useState({
    distance: 10,
    category: "",
    type: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const handleFiltersChange = vars => {
    setVariables({
      ...variables,
      ...vars
    });
  };
  const router = useRouter();
  const { q, location, category } = router.query;

  return (
    <>
      <SEO
        description="Start your job search with myexactjobs. Browse through hundreds of job openings nationally. Exact Staff has the job opportunity you have been looking for so Apply Today!"
        title={`${q || category || "Currently Open"} Jobs Near ${
          location ? location : "You"
        } - My Exact
        Jobs Search`}
      />
      <SearchFilters
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        onChange={handleFiltersChange}
      />
      <PageSection styles={styles}>
        <div className="Container">
          <SearchFieldSection terms={q} location={location} />
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
        .Container {
          max-width: 600px;
          width: 100%;
        }

        p {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default SearchPage;
