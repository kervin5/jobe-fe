import React from "react";
import ApplicationNotesArea from "./ApplicationNotesArea";
import ApplicantInformation from "./ApplicantInformation";
import { Loader } from "semantic-ui-react";
import variables from "../common/globalVariables";
import ApplicationStatusDropdown from "./ApplicationStatusDropdown";
import { SINGLE_JOB_APPLICATION_QUERY } from "./SingleJobApplication";
import { Query } from "react-apollo";

const ApplicationInformation = ({ applicationId }) => {
  return (
    <div className="ApplicationInformation">
      <Query
        query={SINGLE_JOB_APPLICATION_QUERY}
        variables={{ id: applicationId }}
      >
        {({ error, loading, data }) => {
          if (loading) return <Loader active inline="centered" />;
          return (
            <>
              <ApplicantInformation applicationId={applicationId} />
              <ApplicationStatusDropdown
                applicationId={applicationId}
                status={data.application.status}
              />
              <ApplicationNotesArea applicationId={applicationId} />
            </>
          );
        }}
      </Query>

      <style jsx>{`
        .ApplicationInformation {
          margin: auto 20px;
          padding: 20px;
          background-color: ${variables.clearColor};
          border-radius: ${variables.roundedRadius};
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19);
        }
      `}</style>
    </div>
  );
};

export default ApplicationInformation;
