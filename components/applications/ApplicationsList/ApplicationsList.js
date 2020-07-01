import React from "react";
import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
// import ApplicationsListItem from "./ApplicationsListItem";
import { SINGLE_USER_QUERY } from "@/graphql/queries/users";
import { APPLICATIONS_BY_USER_ID_QUERY } from "@/graphql/queries/applications";

/**
 * @param {Object[]} applications - Array of applications object
 * @returns {React.JSX} list of Job nodes
 */

const ApplicationsList = ({ applications }) => {
  let elementToRender = <h3>No applications found</h3>;
  if (applications && applications.length > 0) {
    elementToRender = applications.map(application => {
      return <p>Test</p>;
      // return (
      //   <ApplicationsListItem
      //     key={application.id}
      //     title={application.job.title}
      //     description={application.job.description}
      //     location={application.job.location}
      //     compensation={application.job.minCompensation}
      //     type={application.job.type}
      //     id={application.job.id}
      //     date={application.job.updatedAt}
      //     favorites={job?.favorites?.length}
      //     showFavoritesCount
      //     showJobType
      //     perks={application.job.perks}
      //   />
      // );
    });
  }

  return (
    <React.Fragment>
      <div>{elementToRender}</div>
    </React.Fragment>
  );
};

const ApplicationsListWrapper = ({ applications, userId }) => {
  if (applications?.length) {
    return <ApplicationsList applications={applications} />;
  } else {
    const { error, loading, data } = useQuery(APPLICATIONS_BY_USER_ID_QUERY, {
      variables: { id: userId }
    });
    if (loading) return <p>Loading...</p>;
    return <ApplicationsList applications={data?.applications} />;
  }
};

ApplicationsListWrapper.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.string
};

export default ApplicationsListWrapper;
