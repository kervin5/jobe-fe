import React from "react";
import JobListItem from "./JobListItem";
import PropTypes from "prop-types";

/**
 * @param {Object[]} jobs - Array of jobs object
 * @returns {React.JSX} list of Job nodes
 */

const jobList = ({ jobs }) => {
  let elementToRender = <h3>No jobs found</h3>;

  if (jobs && jobs.length > 0) {
    elementToRender = jobs.map(job => {
      return (
        <JobListItem
          key={job.id}
          title={job.title}
          description={job.description}
          location={job.location}
          compensation={job.minCompensation}
          type={job.type}
          id={job.id}
          date={job.posted}
        />
      );
    });
  }

  return (
    <React.Fragment>
      <div>{elementToRender}</div>
    </React.Fragment>
  );
};

jobList.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default jobList;
