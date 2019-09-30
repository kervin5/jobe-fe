import React, { useState } from "react";
import { withRouter } from "next/router";
import variables from "../../components/common/globalVariables";

import PageSection from "../../components/common/Layout/PageSection";

import SearchFieldSection from "../../components/jobs/Search/SearchFieldSection";
import Button from "../../components/common/UI/Button";
import ButtonGroup from "../../components/common/UI/ButtonGroup";
import Jobs from "../../components/jobs/Jobs";
import SearchFilters from "../../components/jobs/Search/SearchFilters";

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

  return (
    <>
      <SearchFilters
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        onChange={handleFiltersChange}
      />
      <PageSection styles={styles}>
        <div className="Container">
          <SearchFieldSection terms={props.q} location={props.location} />
          <ButtonGroup>
            <Button size={{ height: "30px" }} icon="alarm">
              Add Alert
            </Button>
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
