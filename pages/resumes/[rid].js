import React, { useState } from "react";
import variables from "../../components/common/globalVariables";
import PageSection from "../../components/common/Layout/PageSection";
import ResumeViewer from "../../components/resumes/ResumeViewer";

const pageStyles = `background-color:${variables.mutedColor1};`;

const SingleJobView = props => {
  return (
    <PageSection styles={pageStyles} nopadding column>
      <div className="JobContainer">
        <ResumeViewer url={props.rid} />
        <style jsx>
          {`
            .JobContainer {
              width: 100%;
              max-width: 970px;
              padding-top: 30px;
            }

            @media (max-width: 720px) {
              .JobContainer {
                padding-top: 0;
              }
            }
          `}
        </style>
      </div>
    </PageSection>
  );
}; //eof

SingleJobView.getInitialProps = async function({ query, apolloClient, res }) {
  const { rid } = query;

  //   const jobData = await apolloClient.query({
  //     query: SINGLE_JOB_QUERY,
  //     variables: { id: jobId }
  //   });

  //   if (jobData.data.job.status !== "POSTED") {
  //     redirect({ res }, "/");
  //   }

  return { rid };
};

export default SingleJobView;
