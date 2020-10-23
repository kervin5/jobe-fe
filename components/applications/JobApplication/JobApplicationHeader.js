import React from "react";
import variables from "@/common/globalVariables";
import Icon from "@/common/UI/Icon";
import Title from "@/common/UI/Title";
import Link from "next/link";

const jobListingTitleStyles = `color: ${variables.lightColor};`;
const JobListingLocationStyles = `color: ${variables.lightColor}; opacity: 0.7;`;

const JobApplicationHeader = (props) => (
  <div className="JobApplicationHeader">
    <Title level={2} styles={jobListingTitleStyles}>
      <Link href="/admin/jobs/[jid]" as={`/admin/jobs/${props.jobId}`}>
        <a className="LinkToJob">{props.title}</a>
      </Link>
    </Title>
    <Title level={3} styles={JobListingLocationStyles} weight="400">
      <Icon icon="envelope" /> {props.subtitle}
    </Title>
    <style jsx>{`
      .JobApplicationHeader {
        width: 100%;
        max-width: 1200px;
        padding: 40px;
        background-color: ${variables.accentColor2};
        border-top-right-radius: 30px;
        border-top-left-radius: ${variables.roundedRadius};
        z-index: 800;
        position: relative;
      }

      .JobApplicationHeader a {
        color: white;
        transition: 300ms;
      }

      .JobApplicationHeader a:hover {
        color: ${variables.accentColor1};
      }

      @media only screen and (max-width: 520px) {
        .JobApplicationHeader {
          width: 100%;
          padding: 40px 40px;
          border-top-right-radius: 0px;
          border-top-left-radius: 0px;
        }

        .JobApplicationHeader p {
          padding-bottom: 30px;
        }
      }
    `}</style>
  </div>
);

export default JobApplicationHeader;
