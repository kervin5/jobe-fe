import React from "react";
import Link from "next/link";
import moment from "moment";
import styled from "styled-components";
import variables from "@/common/globalVariables";
import Bubble from "@/common/UI/Bubble";
import Icon from "@/common/UI/Icon";
import Card from "@/common/UI/Card";
import sanitize from "@/lib/html";

import Translator from "@/components/hoc/Translator";
import { numberWithCommas } from "@/components/jobs/JobCompensationBubbles";
import JobPerksBubbles from "@/components/jobs/JobPerksBubbles";
import { currency } from "@/root/config";

const StyledApplicationListItem = styled.div`
  .Card {
    background-color: ${(props) => props.theme.lightColor};
    margin: 20px auto;
    transition: 100ms;
    animation-timing-function: ease-in;
    padding: 20px !important;
    border-radius: 15px;
    width: 100%;
  }

  a {
    color: ${(props) => props.theme.darkColor};
    font-size: 1em;
    text-decoration: none;
  }

  .JobListItemHeader {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    position: relative;

    .JobTitle {
      font-weight: bold;
      text-decoration: none;
      color: ${variables.accentColor2};
      font-size: 1.2em;
      &:hover {
        border-bottom: 1px solid red;
      }
    }
  }

  .Location {
    font-size: 0.9em;
    font-weight: bold;
    margin: 5px 0 0;
  }

  .Content {
    font-weight: normal;
    font-size: 1.1em;

    line-height: 1.4em;
    margin-bottom: 10px;
    display: block;
  }

  .LocationIcon {
    opacity: 0.4;
  }

  .LikeIcon {
    opacity: 0.4;
  }

  .JobListItemFooter {
    display: flex;
    flex-direction: column;
    .row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      margin-top: 5px;
      width: 100%;

      &.wrap {
        flex-wrap: wrap;
        justify-content: flex-start;
      }
    }

    a {
      font-weight: bold;
      text-decoration: none;
    }
  }

  .PostDate {
    font-size: 0.9em;
    font-weight: bold;
    color: ${variables.accentColor1};
  }

  @media (max-width: 720px) {
    .JobListItemHeader {
      margin-top: 10px;
    }

    .JobListItemMainInfo {
      position: absolute;
      right: 0;
      top: 0;

      & > span:nth-child(2) {
        margin-left: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }

      & > span:nth-child(1) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: 0;
      }
    }
  }
`;
const jobListItem = ({ application }) => {
  const shortLocation = application.job.location.name;

  const jobUrl = `/jobs/${application.job.title.replace(
    /[\W_]+/g,
    "-"
  )}-${application.job.location.name.replace(/[\W_]+/g, "-")}-${
    application.job.id
  }`;

  return (
    <StyledApplicationListItem>
      <Card>
        <div className="JobListItemHeader">
          <div>
            <Link
              href="/admin/applications/[aid]"
              as={`/admin/applications/${application.id}`}
              passHref
            >
              <a className="JobTitle">
                <Translator>{application.job.title}</Translator>
              </a>
            </Link>
            <p className="Location">
              <Icon icon="marker" size="sm" className="LocationIcon" />{" "}
              {shortLocation}
            </p>
          </div>

          <div className="JobListItemMainInfo">
            <Bubble color="1">
              {application.job.minCompensation > 0
                ? currency +
                  numberWithCommas(
                    parseFloat(application.job.minCompensation).toFixed(2)
                  )
                : "DOE"}
            </Bubble>
            <Bubble color="3">
              <Translator>{application.status}</Translator>
            </Bubble>
          </div>
        </div>
        <Link
          href="/admin/applications/[aid]"
          as={`/admin/applications/${application.id}`}
          passHref
        >
          <a className="Content">
            <Translator>
              {sanitize(application.job.description, [])["__html"].substring(
                0,
                300
              )}
              ...
            </Translator>
          </a>
        </Link>

        <div className="JobListItemFooter">
          <div className="row wrap">
            <JobPerksBubbles perks={application.job.perks} />
          </div>
          <div className="row">
            <p className="PostDate">
              {moment(application.createdAt).fromNow()}
            </p>
          </div>
        </div>
      </Card>
    </StyledApplicationListItem>
  );
};

export default jobListItem;
