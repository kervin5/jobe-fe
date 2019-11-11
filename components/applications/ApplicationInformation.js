import React from "react";
import ApplicationHistoryFeed from "./ApplicationHistoryFeed";
import AddNoteToApplicationForm from "./AddNoteToApplicationForm";
import variables from "../common/globalVariables";

const ApplicationInformation = ({ applicationId }) => {
  return (
    <div className="ApplicationInformation">
      <AddNoteToApplicationForm />
      <ApplicationHistoryFeed />
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
