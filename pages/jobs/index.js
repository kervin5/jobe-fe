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

const styles = `background-color: ${variables.mutedColor1}; padding: 30px; align-items: flex-start;`;

const SearchContext = React.createContext();

const SearchPage = props => {
  const {
    router: {
      query: { q, location, page }
    }
  } = props;

  const [jobs, setJobs] = useState([]);
  const [searchParams, setSearchParams] = useState({
    terms: q,
    location: location,
    page: page
  });

  useEffect(() => {
    axios
      .get(
        `/jobs?q=${searchParams.terms}&location=${searchParams.location}&page=${searchParams.page}`
      )
      .then(res => {
        fetchData(searchParams.terms, searchParams.location);
      });
  }, []);

  useEffect(() => {
    const {
      router: {
        query: { q, location, page }
      }
    } = props;

    fetchData(q, location, page);
  }, [props.router]);

  const fetchData = (terms, location, page) => {
    axios
      .get(`/jobs?q=${terms}&location=${location}&page=${page}`)
      .then(res => {
        setJobs(res.data);
      });
  };

  return (
    <Layout>
      <PageSection styles={styles}>
        <div className="Container">
          <SearchFieldSection
            terms={searchParams.terms}
            location={searchParams.location}
          />
          <ButtonGroup>
            <Button size={{ height: "30px" }} icon="bell">
              Create Alert
            </Button>
            <Button size={{ height: "30px" }} icon="filter" color="2">
              Filter
            </Button>
          </ButtonGroup>
          <JobList jobs={jobs} />
        </div>
      </PageSection>

      <style jsx>{`
        .Container {
          max-width: 600px;
          width: 100%;
        }
      `}</style>
    </Layout>
  );
};

export default withRouter(SearchPage);
