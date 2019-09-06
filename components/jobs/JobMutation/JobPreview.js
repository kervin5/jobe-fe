import React, { Component } from "react";
import { Query } from "react-apollo";
import JobListing from "../JobListing/JobListing";
import { SINGLE_JOB_QUERY } from "../JobListing/SingleJobListing";
import EditOrContinueButtons from "./EditOrContinueButtons";
import Title from "../../common/UI/Title";

export class JobPreview extends Component {
  render() {
    return (
      <Query query={SINGLE_JOB_QUERY} variables={{ id: this.props.jobId }}>
        {({ error, loading, data }) => {
          if (error) return <p>Error!</p>;
          if (loading) return <p>Loading...</p>;
          if (!data.job) return <p>No job found for: {jobId}</p>;
          const singleJob = data.job;
          return (
            <React.Fragment>
              <Title>Job Preview</Title>
              <EditOrContinueButtons jobId={singleJob.id} />
              <JobListing
                title={singleJob.title}
                location={singleJob.location.name}
                company={"Target"} //change later
                about={singleJob.description}
                description={singleJob.description}
                minAmount={singleJob.minCompensation}
                maxAmount={singleJob.maxCompensation}
                type={singleJob.type}
                qualifications={singleJob.qualifications}
                requirements={singleJob.requirements}
                jobId={singleJob.id}
                aboutCompany={
                  "Under the direction of the Nurse Manager and attending physicians, act as a Medical Scribe and provide electronic medical record and phone support services related to patient care. Duties will include transcribing medical data quickly and accurately while patients are being examined, preparing electronic charts in advance and during visits for new and established patients by entering referring and other treating Doctors(s) contact information/care team, entering orders and referrals, and all medical information relevant to the office visit, take patient history, review of systems, physical exam findings, symptoms and complaints, progress notes, procedure notes, follow up lab and diagnostic orders and results. Position also includes phone support in clinic, and relaying messages to/from clinical teams, patients, and transcribing into EHR as needed."
                }
                preview={true}
              />
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default JobPreview;
