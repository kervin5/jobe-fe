import React, { setState } from "react";
import variables from "../../../../components/common/globalVariables";
import Bubble from "../../../common/UI/Bubble";
import Icon from "../../../common/UI/Icon";
import Title from "../../../common/UI/Title";
import FavoriteButton from "../../JobFavoriteButton/FavoriteButton";
import PrompToRegister from "../../../users/PrompToRegister";
import Translator from "../../../hoc/Translator";
import JobCompensationBubbles from "../../JobCompensationBubbles";

const jobListingTitleStyles = `color: ${variables.clearColor};`;
const JobListingLocationStyles = `color: ${variables.clearColor}; opacity: 0.7;`;

const JobListingHeader = props => (
  <div className="JobListingHeader" data-test="job-listing-header">
    <Title size={"l"} styles={jobListingTitleStyles} data-test="title-section">
      <Translator>{props.title}</Translator>
    </Title>
    <Title
      size={"m"}
      styles={JobListingLocationStyles}
      weight="400"
      data-test="location-section"
    >
      <Icon icon="map marker alternate" />{" "}
      <Translator>{props.location}</Translator>
    </Title>
    <div className="JobListingHeaderBar">
      <div className="JobListingJobType">
        <JobCompensationBubbles
          minCompensation={props.minCompensation}
          maxCompensation={props.maxCompensation}
        />
        <Bubble color="2">
          <Translator>{props.type}</Translator>
        </Bubble>
      </div>
      {props.hideFavoriteButton ? null : (
        <PrompToRegister>
          <FavoriteButton jobId={props.jobId} />
        </PrompToRegister>
      )}
    </div>
    <style jsx>{`
      .JobListingHeader {
        width: 100%;
        max-width: 1200px;
        padding: 40px;
        background-color: ${variables.accentColor2};
        border-top-right-radius: 30px;
        border-top-left-radius: ${variables.roundedRadius};
        z-index: 800;
        position: relative;
      }

      .JobListingHeaderBar {
        display: flex;
        justify-content: space-between;
        position: relative;
      }

      @media only screen and (max-width: 520px) {
        .JobListingHeader {
          width: 100%;
          padding: 40px 40px;
          border-top-right-radius: 0px;
          border-top-left-radius: 0px;
        }

        .JobListingHeader p {
          padding-bottom: 30px;
        }
      }
    `}</style>
  </div>
);

export default JobListingHeader;
