import React, { Component } from "react";
import SingleJobListing from "../JobListing/SingleJobListing";

export class JobPreview extends Component {
  render() {
    return <SingleJobListing jobId={this.props.jobId} preview={true} />;
  }
}

export default JobPreview;
