import React from "react";

// import classes from './JobCreator.module.scss';
import JobCreatorForm from "./JobCreatorForm";
import Title from "../../common/UI/Title";

const jobCreator = props => {
  return (
    <div className={"JobCreator"}>
      <Title size={props.smallTitle ? "m" : "l"}>Post a Job</Title>
      <p className={"Instructions"}>
        Please enter the information for the new job listing
      </p>
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
