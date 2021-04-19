import React from "react";
import ApplicationHistoryFeed from "./ApplicationHistoryFeed";
import AddNoteToApplicationForm from "./AddNoteToApplicationForm";

const ApplicationNotesArea = ({ applicationId }) => {
  return (
    <>
      <AddNoteToApplicationForm applicationId={applicationId} />
      {/* <ApplicationHistoryFeed applicationId={applicationId} /> */}
    </>
  );
};

export default ApplicationNotesArea;
