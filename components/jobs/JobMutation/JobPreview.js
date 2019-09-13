import React, { Component } from "react";
import SingleJobListing from "../JobListing/SingleJobListing";
import EditOrContinuerButton from "./EditOrContinueButtons";

export class JobPreview extends Component {
  render() {
    return (
      <>
        <EditOrContinuerButton jobId={this.props.jobId} />
        <SingleJobListing jobId={this.props.jobId} preview={true} />
      </>
    );
  }
}

export default JobPreview;
