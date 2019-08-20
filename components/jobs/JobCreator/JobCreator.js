import React, { useState } from "react";

// import classes from './JobCreator.module.scss';
import JobCreatorForm from "./JobCreatorForm";
import Title from "../../common/UI/Title";

const jobCreator = props => {
  const actions = {
    creating: {
      title: "Post a Job",
      caption: "Please enter the information for the new job listing"
    }
  };

  const [currentAction, setCurrentAction] = useState(actions["creating"]);

  return (
    <div className={"JobCreator"}>
      <Title size={props.smallTitle ? "m" : "l"}>{currentAction.title}</Title>
      <p className={"Instructions"}>{currentAction.caption}</p>
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
