import React from "react";
import JobListItem from "./JobListItem";
import PropTypes from "prop-types";
import appText from "@/lang/appText";
import Title from "@/common/UI/Title";

/**
 * @param {Object[]} jobs - Array of jobs object
 * @returns {React.JSX} list of Job nodes
 */

const jobList = (props) => {
  const { jobs } = props;
  let elementToRender = (
    <Title capitalize size="m" center>
      {appText.messages.notfound}
    </Title>
  );

  if (jobs && jobs.length > 0) {
    elementToRender = jobs.map((job) => {
      return (
        <JobListItem
          key={job.id}
          title={job.title}
          description={job.description}
          location={job.location}
          compensation={job.minCompensation}
          type={job.type}
          id={job.id}
          date={job.updatedAt}
          favorites={job?.favorites?.length}
          showFavoritesCount
          showJobType
          perks={job.perks}
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
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default jobList;
