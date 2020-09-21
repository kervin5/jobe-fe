import React, { Component } from "react";
import SingleJobListing from "../JobListing/JobListingQuery";
import EditOrContinuerButton from "./EditOrContinueButtons";
import styled from "styled-components";

const StyledJobPreview = styled.div`
  max-width: ${(props) => props.maxWidth};
  margin: ${(props) => (props.maxWidth !== "100%" ? "0 auto" : "10px")};
`;

const JobPreview = ({ jobId, maxWidth = "100%" }) => {
  return (
    <StyledJobPreview maxWidth={maxWidth}>
      <EditOrContinuerButton jobId={jobId} />
      <SingleJobListing jobId={jobId} preview={true} />
    </StyledJobPreview>
  );
};

export default JobPreview;
