import React, { useState, useEffect } from "react";
import axios from "../../data/api";
import variables from "../../components/common/globalVariables";
import Layout from "../../components/common/Layout/Layout";
import { withRouter } from "next/router";
import JobList from "../../components/jobs/JobList/JobList";
import PageSection from "../../components/common/Layout/PageSection";
import SearchBar from "../../components/jobs/Search/SearchBar";

const styles = `background-color: ${variables.mutedColor1}; padding: 30px;`;

const SearchPage = props => {
  const {
    router: {
      query: { q, location }
    }
  } = props;
  const [jobs, setJobs] = useState([]);
  console.log(q, location);

  useEffect(() => {
    axios.get(`/jobs/query?q=${q}&location=${location}`).then(res => {
      setJobs(res.data);
      console.log(res);
    });
  }, []);

  return (
    <Layout>
      <PageSection styles={styles}>
        <div className="Container">
          <SearchBar terms={q} location={location} />

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
