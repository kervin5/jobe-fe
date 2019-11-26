import React from "react";
import variables from "../../../components/common/globalVariables";
import Icon from "../../common/UI/Icon";
import Title from "../../common/UI/Title";
import Link from "next/link";

const jobListingTitleStyles = `color: ${variables.clearColor};`;
const JobListingLocationStyles = `color: ${variables.clearColor}; opacity: 0.7;`;

const JobApplicationHeader = props => (
  <div className="JobApplicationHeader">
    <Title size={"l"} styles={jobListingTitleStyles}>
      <Link href="/jobs/[jid]" as={`/jobs/${props.jobId}`}>
        <a className="LinkToJob">{props.title}</a>
      </Link>
    </Title>
    <Title size={"m"} styles={JobListingLocationStyles} weight="400">
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
