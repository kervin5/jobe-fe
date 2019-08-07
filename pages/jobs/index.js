import React, { useEffect, useState } from "react";
import { withRouter } from "next/router";
import axios from "../../data/api";
import variables from "../../components/common/globalVariables";

import PageSection from "../../components/common/Layout/PageSection";

import JobList from "../../components/jobs/JobList/JobList";
import SearchFieldSection from "../../components/jobs/Search/SearchFieldSection";
import Button from "../../components/common/UI/Button";
import ButtonGroup from "../../components/common/UI/ButtonGroup";
import Loader from "../../components/common/UI/Animated/Loader";
import SideDrawer from "../../components/common/UI/Navigation/SideDrawer";

const styles = `background-color: ${variables.mutedColor1}; padding: 30px; align-items: flex-start;`;

const SearchContext = React.createContext();

const SearchPage = props => {
  const {
    router: { query }
  } = props;

  const [jobs, setJobs] = useState(null);
  const [page, setPage] = useState(1);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchData(query.q, query.location, page, true);
  }, [props.router]);

  const fetchData = (terms, location, page, refreshAll) => {
    axios
      .get(`/jobs?q=${terms}&location=${location}&page=${page}`)
      .then(res => {
        let listOfJobs = [];
        if (refreshAll) {
          listOfJobs = res.data;
        } else {
          listOfJobs =
            jobs == null ? [].concat(res.data) : jobs.concat(res.data);
        }
        setJobs(listOfJobs);
      });
  };

  const handleViewMoreButton = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (page !== 1) {
      fetchData(query.q, query.location, page);
    }
  }, [page]);

  useEffect(() => {
    if (
      (jobs && jobs.length <= 10 && page === 1) ||
      (jobs && jobs.length > 0 && jobs.length % page !== 0)
    ) {
      setShowMoreButton(false);
    }
  }, [jobs]);

  return (
    <>
      <SideDrawer show={showFilters} close={() => setShowFilters(false)}>
        <h3>Filter</h3>
      </SideDrawer>
      <PageSection styles={styles}>
        <div className="Container">
          <SearchFieldSection terms={query.q} location={query.location} />
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
          {jobs ? <JobList jobs={jobs} /> : <Loader />}
          {showMoreButton ? (
            <Button fullWidth click={handleViewMoreButton}>
              View More
            </Button>
          ) : (
            <p>That's all for now 😊</p>
          )}
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

export default withRouter(SearchPage);
