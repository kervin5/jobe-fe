import React from "react";
import ApplicationNotesArea from "./ApplicationNotesArea";
import ApplicantInformation from "./ApplicantInformation";
import { Loader, Tab } from "semantic-ui-react";
import { Query } from "react-apollo";
import variables from "@/common/globalVariables";
import ApplicationStatusDropdown from "./ApplicationStatusDropdown";
import OtherApplicationsList from "./OtherApplicationsList";
import { SINGLE_JOB_APPLICATION_QUERY } from "./SingleJobApplication";
import Title from "@/common/UI/Title";

const ApplicationInformation = ({ applicationId }) => {
  return (
    <div className="ApplicationInformation">
      <Query
        query={SINGLE_JOB_APPLICATION_QUERY}
        variables={{ id: applicationId }}
      >
        {({ error, loading, data }) => {
          if (loading) return <Loader active inline="centered" />;
          const panes = [
            {
              menuItem: "Updates",
              render: () => (
                <Tab.Pane>
                  <div className="Section">
                    <Title size="m">Status</Title>
                    <ApplicationStatusDropdown
                      applicationId={applicationId}
                      status={data.application.status}
                    />
                  </div>
                  <div className="Section">
                    <Title size="m">Notes</Title>
                    <ApplicationNotesArea applicationId={applicationId} />
                  </div>
                </Tab.Pane>
              )
            },
            {
              menuItem: "Other Applications",
              render: () => (
                <Tab.Pane>
                  <OtherApplicationsList
                    applicationId={applicationId}
                    userId={data.application.user.id}
                  />
                </Tab.Pane>
              )
            }
          ];
          return (
            <>
              <div className="Section">
                <ApplicantInformation applicationId={applicationId} />
              </div>

              <Tab panes={panes} />
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
          max-width: 350px;
        }

        .Section {
            margin-top: 10px;
            margin-bottom; 10px;
        }
      `}</style>
    </div>
  );
};

export default ApplicationInformation;
