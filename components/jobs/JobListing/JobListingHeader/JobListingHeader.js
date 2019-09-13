import React, { setState } from "react";
import variables from "../../../../components/common/globalVariables";
import Bubble from "../../../common/UI/Bubble";
import Icon from "../../../common/UI/Icon";
import Title from "../../../common/UI/Title";
import FavoriteButton from "../../../common/UI/FavoriteButton";

const jobListingTitleStyles = `color: ${variables.clearColor};`;
const JobListingLocationStyles = `color: ${variables.clearColor}; opacity: 0.7;`;

const header = props => (
  <div className="header" data-test="job-listing-header">
    <Title size={"l"} styles={jobListingTitleStyles} data-test="title-section">
      {props.title}
    </Title>
    <Title
      size={"m"}
      styles={JobListingLocationStyles}
      weight="400"
      data-test="location-section"
    >
      <Icon icon="map marker alternate" /> {props.location}
    </Title>

    <div className="JobListingHeaderBar">
      <div className="JobListingJobType">
        <Bubble color="1">
          ${props.minCompensation}-{props.maxCompensation}
        </Bubble>
        <Bubble color="2">{props.type}</Bubble>
      </div>
      {props.hideFavoriteButton ? null : <FavoriteButton jobId={props.jobId} />}
    </div>
    <style jsx>{`
      .header {
        width: 100%;
        max-width: 1200px;
        padding: 40px;
        background-color: ${variables.accentColor2};
        border-top-right-radius: 30px;
        border-top-left-radius: ${variables.roundedRadius};
        z-index: 800;
      }

      .JobListingHeaderBar {
        display: flex;
        justify-content: space-between;
      }

      @media only screen and (max-width: 520px) {
        .header {
          width: 100%;
          padding: 40px 40px;
          border-top-right-radius: 0px;
          border-top-left-radius: 0px;
        }

        .header p {
          padding-bottom: 30px;
        }
      }
    `}</style>
  </div>
);

export default header;
