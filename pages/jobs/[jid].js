import React from "react";
import { useRouter } from "next/router";
import variables from "@/common/globalVariables";
import JobListingQuery from "@/components/jobs/JobListing/JobListingQuery";
import { getJobsFromAPI, getJob } from "@/lib/backend";

import PageSection from "@/common/Layout/PageSection";

const pageStyles = `background-color:${variables.mutedColor1};`;

const SingleJobView = (props) => {
  const router = useRouter();
  const { jid } = router.query;
  const jobId = extractJobId(jid);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <PageSection styles={pageStyles}>
      <div className="JobContainer">
        <JobListingQuery
          jobData={props.jobData}
          jobId={extractJobId(jobId ?? props.query.jid)}
          countView
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
  const jobs = await getJobsFromAPI();
  const jobsPaths = jobs.map((job) => {
    const jobPath = `${job.title.replace(
      /[\W_]+/g,
      "-"
    )}-${job.location.name.replace(/[\W_]+/g, "-")}-${job.id}`;
    return { params: { jid: jobPath } };
  });
  return {
    paths: jobsPaths,
    fallback: true, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const { jid } = params;
  const jobId = extractJobId(jid);
  const jobData = await getJob(jobId);

  return { props: { jobData, jobId }, revalidate: 1 };
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
