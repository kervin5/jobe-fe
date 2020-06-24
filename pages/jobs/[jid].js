import React from "react";
import gql from "graphql-tag";
import redirect from "@/lib/redirect";
import Router, { useRouter } from "next/router";
import variables from "@/components/common/globalVariables";
import SingleJobListing from "@/components/jobs/JobListing/SingleJobListing";
import { fetchContentFromAPI, getJob } from "@/lib/backend";

import PageSection from "@/components/common/Layout/PageSection";

const pageStyles = `background-color:${variables.mutedColor1};`;

const SINGLE_JOB_QUERY = gql`
  query SINGLE_JOB_QUERY($id: String!) {
    job(where: { id: $id }) {
      id
      status
    }
  }
`;

const SingleJobView = props => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <PageSection styles={pageStyles} nopadding column>
      <div className="JobContainer">
        <SingleJobListing
          jobData={props.jobData}
          jobId={props.jobId ?? extractJobId(props.query.jid)}
        />
        <style jsx>
          {`
            .JobContainer {
              width: 100%;
              max-width: 970px;
              padding-top: 30px;
              margin: auto;
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

export async function getStaticPaths() {
  const jobs = await fetchContentFromAPI();
  const jobsPaths = jobs.map(job => {
    const jobPath = `${job.title.replace(
      /[\W_]+/g,
      "-"
    )}-${job.location.name.replace(/[\W_]+/g, "-")}-${job.id}`;
    return { params: { jid: jobPath } };
  });
  return {
    paths: jobsPaths,
    fallback: true // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const { jid } = params;
  const jobId = extractJobId(jid);
  const jobData = await getJob(jobId);

  return { props: { jobData, jobId }, unstable_revalidate: 1 };
}

function extractJobId(slug) {
  if (slug) {
    const slugParts = slug.split("-");
    const jobId = slugParts[slugParts.length - 1];
    return jobId;
  }
  return undefined;
}

export default SingleJobView;
