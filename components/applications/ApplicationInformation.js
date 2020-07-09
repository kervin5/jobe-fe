import React from "react";
import ApplicationNotesArea from "./ApplicationNotesArea";
import ApplicantInformation from "./ApplicantInformation";
import { Loader, Tab } from "semantic-ui-react";
import { Query } from "@apollo/react-components";
import variables from "@/common/globalVariables";
import ApplicationStatusDropdown from "./ApplicationStatusDropdown";
import OtherApplicationsList from "./OtherApplicationsList";
import { SINGLE_JOB_APPLICATION_QUERY } from "./SingleJobApplication";
import Title from "@/common/UI/Title";
import appText from "@/lang/appText";

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
              menuItem: appText.objects.update.plural,
              render: () => (
                <Tab.Pane>
                  <div className="Section">
                    <Title size="m" capitalize>
                      {appText.objects.status.singular}
                    </Title>
                    <ApplicationStatusDropdown
                      applicationId={applicationId}
                      status={data.application.status}
                    />
                  </div>
                  <div className="Section">
                    <Title size="m" capitalize>
                      {appText.objects.note.plural}
                    </Title>
                    <ApplicationNotesArea applicationId={applicationId} />
                  </div>
                </Tab.Pane>
              ),
            },
            {
              menuItem:
                appText.objects.other.plural +
                " " +
                appText.objects.application.plural,
              render: () => (
                <Tab.Pane>
                  <OtherApplicationsList
                    applicationId={applicationId}
                    userId={data.application.user.id}
                  />
                </Tab.Pane>
              ),
            },
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
