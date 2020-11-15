import React from "react";
import styled from "styled-components";
import Flex from "@/common/UI/Flex";
import Bubble from "@/common/UI/Bubble";
import Icon from "@/common/UI/Icon";
import Title from "@/common/UI/Title";
import FavoriteButton from "../JobFavoriteButton/FavoriteButton";
import PrompToRegister from "@/components/users/PrompToRegister";
import Translator, { ListOfLanguages } from "@/common/UI/Translator/Translator";
import JobCompensationBubbles from "../JobCompensationBubbles";
import JobPerksBubbles from "../JobPerksBubbles";

const StyledJobListingHeader = styled.div`
  &.JobListingHeader {
    width: 100%;
    padding: 60px 40px 0;
    z-index: 8;
    position: relative;
  }

  .JobListingMeta {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    & > * {
      margin-bottom: 10px;
    }
  }

  .JobListingHeaderBar {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin: 20px 0;
  }

  @media only screen and (max-width: 520px) {
    .JobListingHeader {
      width: 100%;
      padding: 60px 40px;
      border-top-right-radius: 0px;
      border-top-left-radius: 0px;
    }

    .JobListingHeader p {
      padding-bottom: 30px;
    }
  }
`;

const JobListingHeader = (props) => (
  <StyledJobListingHeader className="JobListingHeader">
    <Title nomargin className="JobTitle">
      <Translator>{props.title}</Translator>
    </Title>
    <Title level={3} nomargin>
      <Icon icon="location_on" /> <Translator>{props.location}</Translator>
    </Title>
    <div className="JobListingHeaderBar">
      <div className="JobListingMeta">
        {(props.showCompensation || !props.perks) && (
          <JobCompensationBubbles
            minCompensation={props.minCompensation}
            maxCompensation={props.maxCompensation}
          />
        )}
        {props.showType && (
          <Bubble color="2">
            <Translator>{props.type}</Translator>
          </Bubble>
        )}
        {props.showPerks && <JobPerksBubbles perks={props.perks} />}
      </div>
    </div>
    <Flex justify="space-between">
      <ListOfLanguages />
      {props.hideFavoriteButton ? null : (
        <PrompToRegister>
          <FavoriteButton jobId={props.jobId} count={props.favoritesCount} />
        </PrompToRegister>
      )}
    </Flex>
  </StyledJobListingHeader>
);

export default JobListingHeader;
