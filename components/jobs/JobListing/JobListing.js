import React from "react";
import styled from "styled-components";

import JobListingHeader from "./JobListingHeader";
import SEO from "@/components/SEO";
import sanitize from "@/lib/html";
import SocialMedia from "@/common/UI/Social/SocialMedia";
import Flex from "@/common/UI/Flex";
import StucturedJobListing from "./JobListingStructuredData";
import { jobsSettings } from "@/root/config";

import JobListingBody from "./JobListingBody";
import appText from "@/lang/appText";

const StyledJobListing = styled.div`
  border: 1px solid blue;
  .Labels {
    margin-top: 30px;
  }
`;

const jobListing = (props) => {
  return (
    <StyledJobListing>
      <JobListingHeader
        perks={props.data.perks}
        title={props.data.title}
        location={props.data.location}
        minCompensation={props.data.minCompensation}
        maxCompensation={props.data.maxCompensation}
        type={props.data.type}
        hideFavoriteButton={props.preview}
        jobId={props.data.id}
        showPerks
        showType={jobsSettings.showJobType}
        showCompensation={jobsSettings.showPayRate}
        favoritesCount={props.data.favorites.length}
      />
      <Flex>
        <JobListingBody data={props.data} />

        {props.preview ? null : (
          <SocialMedia url={props.data.permalink} vertical />
        )}
      </Flex>

      <StucturedJobListing data={props.data} />
      <SEO
        description={
          sanitize(props.data.description, []).__html.substr(0, 400) +
          `...${appText.seo.description}`
        }
        title={
          props.data.title +
          ` ${appText.prepositions.at} ` +
          props.data.location +
          `- ${appText.seo.title}`
        }
        url={props.data.permalink}
        ogImage="/images/exactstaffsquare.jfif"
        keywords={
          props.data.categories.map((cat) => cat.name).join(", ") +
          ", " +
          props.data.skills.map((skill) => skill.name).join(", ")
        }
      />
    </StyledJobListing>
  );
};

export default jobListing;
