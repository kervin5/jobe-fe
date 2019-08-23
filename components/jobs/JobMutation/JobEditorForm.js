import React from "react";
import JobMutationBaseForm from "./JobMutationBaseForm";
import Title from "../../common/UI/Title";

const JobEditorForm = props => {
  return (
    <div>
      <Title size={props.smallTitle ? "m" : "l"}>Edit Job</Title>
      <p className={"Instructions"}>Enter the job details</p>
      <JobMutationBaseForm />
    </div>
  );
};

export default JobEditorForm;
