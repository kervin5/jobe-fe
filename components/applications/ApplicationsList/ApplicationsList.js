import React from "react";
import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import ApplicationsListItem from "./ApplicationsListItem";
// import { SINGLE_USER_QUERY } from "@/graphql/queries/users";
import { APPLICATIONS_BY_USER_ID_QUERY } from "@/graphql/queries/applications";

/**
 * @param {Object[]} applications - Array of applications object
 * @returns {React.JSX} list of Job nodes
 */

const ApplicationsList = ({ applications }) => {
  let elementToRender = <h3>No applications found</h3>;
  if (applications && applications.length > 0) {
    elementToRender = applications.map(application => {
      // return <p>Test</p>;
      return (
        <ApplicationsListItem key={application.id} application={application} />
      );
    });
  }

  return (
    <React.Fragment>
      <div>{elementToRender}</div>
    </React.Fragment>
  );
};

const ApplicationsListWrapper = ({ applications, userId }) => {
  if (applications) {
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
