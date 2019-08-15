import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import JobListing from "./JobListing";

const SINGLE_JOB_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    job(where: { id: $id }) {
      id
      title
      description
      minCompensation
      maxCompensation
      type
      qualifications
      requirements
      createdAt
      location {
        name
      }
    }
  }
`;

const SingleJobListing = ({ jobId }) => {
  return (
    <Query query={SINGLE_JOB_QUERY} variables={{ id: jobId }}>
      {({ error, loading, data }) => {
        if (error) return <p>Error!</p>;
        if (loading) return <p>Loading...</p>;
        if (!data.job) return <p>No job found for: {jobId}</p>;

        const singleJob = data.job;
        return (
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
            jobId={singleJob._id}
            aboutCompany={
              "Under the direction of the Nurse Manager and attending physicians, act as a Medical Scribe and provide electronic medical record and phone support services related to patient care. Duties will include transcribing medical data quickly and accurately while patients are being examined, preparing electronic charts in advance and during visits for new and established patients by entering referring and other treating Doctors(s) contact information/care team, entering orders and referrals, and all medical information relevant to the office visit, take patient history, review of systems, physical exam findings, symptoms and complaints, progress notes, procedure notes, follow up lab and diagnostic orders and results. Position also includes phone support in clinic, and relaying messages to/from clinical teams, patients, and transcribing into EHR as needed."
            }
          />
        );
      }}
    </Query>
  );
};

export default SingleJobListing;
