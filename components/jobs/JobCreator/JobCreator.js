import React, { useState } from "react";

// import classes from './JobCreator.module.scss';
import JobCreatorForm from "./JobCreatorForm";
import Title from "../../common/UI/Title";

const jobCreator = props => {
  const actions = {
    creating: {
      title: "Post a Job",
      caption: "Please enter the information for the new job listing"
    },
    editing: {
      title: "Edit Job",
      caption: "Please review the details of the job"
    }
  };

  const action = props.edit ? "editing" : "creating";

  return (
    <div className={"JobCreator"}>
      <Title size={props.smallTitle ? "m" : "l"}>{actions[action].title}</Title>
      <p className={"Instructions"}>{actions[action].caption}</p>
      <JobCreatorForm />
      <style jsx>{`
        div {
          width: 100%;
        }

        .Instructions {
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

export default jobCreator;
