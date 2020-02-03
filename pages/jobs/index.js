import React, { useState } from "react";
import { withRouter } from "next/router";
import variables from "../../components/common/globalVariables";

import PageSection from "../../components/common/Layout/PageSection";

import SearchFieldSection from "../../components/jobs/Search/SearchFieldSection";
import Button from "../../components/common/UI/Button";
import ButtonGroup from "../../components/common/UI/ButtonGroup";
import Jobs from "../../components/jobs/Jobs";
import SearchFilters from "../../components/jobs/Search/SearchFilters";
import PageTitle from "../../components/common/Layout/PageTitle";
import SEO from "../../components/SEO";

const styles = `background-color: ${variables.mutedColor1}; padding: 30px; align-items: flex-start;`;

const SearchPage = props => {
  const [variables, setVariables] = useState({
    distance: 10,
    category: "",
    type: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const handleFiltersChange = vars => {
    console.log(vars);
    setVariables({
      ...variables,
      ...vars
    });
  };

  return (
    <>
      <SEO
        description="Start your job search with myexactjobs. Browse through hundreds of job openings nationally. Exact Staff has the job opportunity you have been looking for so Apply Today!"
        title={`${props.q} Jobs Near ${
          props.location ? props.location : "You"
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
          <SearchFieldSection terms={props.q} location={props.location} />
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
            location={props.location}
            q={props.q}
            category={props.category || variables.category}
            type={variables.type}
            radius={parseInt(variables.distance)}
          />
        </div>
      </PageSection>
      <div itemscope itemtype="https://schema.org/WebSite">
        <meta itemprop="url" content="https://www.myexactjobs.com/" />
        <form
          itemprop="potentialAction"
          itemscope
          itemtype="https://schema.org/SearchAction"
        >
          <meta
            itemprop="target"
            content="https://www.myexactjobs.com/jobs?q={search_term_string}"
          />
          <input
            itemprop="query-input"
            type="text"
            name="search_term_string"
            required
          />
          <input type="submit" />
        </form>
      </div>
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

SearchPage.getInitialProps = async function({ query }) {
  // console.log(query);
  const { q, location, category } = query;
  return { q, location, category };
};

export default withRouter(SearchPage);
