import React, { useState } from "react";
import { withRouter } from "next/router";
import variables from "../../components/common/globalVariables";

import PageSection from "../../components/common/Layout/PageSection";

import SearchFieldSection from "../../components/jobs/Search/SearchFieldSection";
import Button from "../../components/common/UI/Button";
import ButtonGroup from "../../components/common/UI/ButtonGroup";
import SideDrawer from "../../components/common/UI/Navigation/SideDrawer";
import Jobs from "../../components/jobs/Jobs";
const styles = `background-color: ${variables.mutedColor1}; padding: 30px; align-items: flex-start;`;

const SearchPage = props => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <>
      <SideDrawer show={showFilters} close={() => setShowFilters(false)}>
        <h3>Filter</h3>
      </SideDrawer>
      <PageSection styles={styles}>
        <div className="Container">
          <SearchFieldSection terms={props.q} location={props.location} />
          <ButtonGroup>
            <Button size={{ height: "30px" }} icon="alarm">
              Create Alert
            </Button>
            <Button
              size={{ height: "30px" }}
              icon="filter"
              color="2"
              click={() => setShowFilters(!showFilters)}
            >
              Filter
            </Button>
          </ButtonGroup>
          <Jobs location={props.location} q={props.q} />
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
  const { q, location } = query;
  return { q, location };
};

export default withRouter(SearchPage);
