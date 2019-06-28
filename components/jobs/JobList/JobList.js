import React from "react";
import JobListItem from "./JobListItem";

const jobList = props => {
  let elementToRender = <h3>No jobs found</h3>;

  if (props.jobs.length > 0) {
    elementToRender = props.jobs.map(job => {
      return (
        <JobListItem
          key={job._id}
          title={job.title}
          description={job.description}
          location={job.location}
          compensation={job.minCompensation}
          type={job.type}
          id={job._id}
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

export default jobList;
