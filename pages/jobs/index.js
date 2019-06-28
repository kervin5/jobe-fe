import React, { useEffect, useState } from "react";
import axios from "../../data/api";
import variables from "../../components/common/globalVariables";
import Layout from "../../components/common/Layout/Layout";
import { withRouter } from "next/router";
import JobList from "../../components/jobs/JobList/JobList";
import PageSection from "../../components/common/Layout/PageSection";
import SearchFieldSection from "../../components/jobs/Search/SearchFieldSection";
import Button from "../../components/common/UI/Button";
import ButtonGroup from "../../components/common/UI/ButtonGroup";
import Loader from "../../components/common/UI/Animated/Loader";
import Router from "next/router";

const styles = `background-color: ${variables.mutedColor1}; padding: 30px; align-items: flex-start;`;

const SearchContext = React.createContext();

const SearchPage = props => {
  const {
    router: { query }
  } = props;

  const [jobs, setJobs] = useState(null);
  const [terms, setTerms] = useState(query.q);
  const [location, setLocation] = useState(query.location);
  const [page, setPage] = useState(parseInt(query.page));
  const [showMoreButton, setShowMoreButton] = useState(true);

  useEffect(() => {
    fetchData(terms, location, page);
  }, [props.router]);

  const fetchData = (terms, location, page) => {
    axios
      .get(`/jobs?q=${terms}&location=${location}&page=${page}`)
      .then(res => {
        const listOfJobs =
          jobs == null ? [].concat(res.data) : jobs.concat(res.data);
        setJobs(listOfJobs);
      });
  };

  const handleViewMoreButton = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetchData(terms, location, page);
  }, [page]);

  useEffect(() => {
    if (jobs && jobs.length > 0 && jobs.length % page !== 0) {
      setShowMoreButton(false);
    }
  }, [jobs]);

  return (
    <Layout>
      <PageSection styles={styles}>
        <div className="Container">
          <SearchFieldSection terms={terms} location={location} />
          <ButtonGroup>
            <Button size={{ height: "30px" }} icon="bell">
              Create Alert
            </Button>
            <Button size={{ height: "30px" }} icon="filter" color="2">
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
    </Layout>
  );
};

export default withRouter(SearchPage);
