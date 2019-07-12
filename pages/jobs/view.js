import React, { useState } from "react";
import Router from "next/router";
import Layout from "../../components/common/Layout/Layout";

import axios from "../../data/api";
import variables from "../../components/common/globalVariables";

import Container from "../../components/common/Layout/Container";
import JobListing from "../../components/jobs/JobListing/JobListing";

import PageSection from "../../components/common/Layout/PageSection";
import Loader from "../../components/common/UI/Animated/Loader";

const pageStyles = `background-color:${variables.mutedColor1}`;

const ViewJobPage = props => {
  const [singleJob, setSingleJob] = useState(props.job);

  let waitingOnData = <Loader />;

  if (singleJob) {
    waitingOnData = (
      <JobListing
        title={singleJob.title}
        location={singleJob.location}
        business={"Target"} //change later
        about={singleJob.description}
        description={singleJob.description}
        minAmount={singleJob.minCompensation}
        maxAmount={singleJob.maxCompensation}
        type={singleJob.type}
        aboutCompany={
          "Under the direction of the Nurse Manager and attending physicians, act as a Medical Scribe and provide electronic medical record and phone support services related to patient care. Duties will include transcribing medical data quickly and accurately while patients are being examined, preparing electronic charts in advance and during visits for new and established patients by entering referring and other treating Doctors(s) contact information/care team, entering orders and referrals, and all medical information relevant to the office visit, take patient history, review of systems, physical exam findings, symptoms and complaints, progress notes, procedure notes, follow up lab and diagnostic orders and results. Position also includes phone support in clinic, and relaying messages to/from clinical teams, patients, and transcribing into EHR as needed."
        }
        qualifications={singleJob.qualifications}
        requirements={singleJob.requirements}
        jobId={singleJob._id}
      />
    );
  }

  return (
    <Layout>
      <PageSection styles={pageStyles}>
        <Container>{waitingOnData}</Container>
      </PageSection>
    </Layout>
  );
}; //eof

ViewJobPage.getInitialProps = async function({ query }) {
  const slugParts = query.slug.split("-");
  const jobId = slugParts[slugParts.length - 1];

  try {
    const jobInfo = await axios.get("/jobs/single/" + jobId);
    const result = { job: jobInfo.data };
    return result;
  } catch (err) {
    console.log(err.response);
  }
};

export default ViewJobPage;
