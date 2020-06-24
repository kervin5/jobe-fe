import React from "react";
import Link from "next/link";
import moment from "moment";
import variables from "@/common/globalVariables";
import Bubble from "@/common/UI/Bubble";
import Icon from "@/common/UI/Icon";
import FavoriteButton from "../JobFavoriteButton/FavoriteButton";
import Card from "@/common/UI/Card";
import sanitize from "@/lib/html";
import PrompToRegister from "@/components/users/PrompToRegister";
import Translator from "@/components/hoc/Translator";
import { numberWithCommas } from "../JobCompensationBubbles";
import JobPerksBubbles from "../JobPerksBubbles";

const styles = ` background-color: ${variables.clearColor};
                margin: 20px auto;
                transition: 100ms;
                animation-timing-function: ease-in;
                padding: 20px !important;
                border-radius: 15px;
                width: 100%;
                `;

const jobListItem = props => {
  const shortLocation = props.location.name;

  const jobUrl = `/jobs/${props.title.replace(
    /[\W_]+/g,
    "-"
  )}-${props.location.name.replace(/[\W_]+/g, "-")}-${props.id}`;

  return (
    <Card styles={styles}>
      <div className="JobListItemHeader">
        <div>
          <Link href="/jobs/[jid]" as={jobUrl}>
            <a className="JobTitle">
              <Translator>{props.title}</Translator>
            </a>
          </Link>
          <p className="Location">
            <Icon icon="marker" size="sm" className="LocationIcon" />{" "}
            {shortLocation}
          </p>
        </div>

        <div className="JobListItemMainInfo">
          {props.showPayRate && (
            <Bubble color="1">
              {props.compensation > 0
                ? "$" +
                  numberWithCommas(parseFloat(props.compensation).toFixed(2))
                : "DOE"}
            </Bubble>
          )}
          {props.showJobType && (
            <Bubble color="2">
              <Translator>{props.type}</Translator>
            </Bubble>
          )}
        </div>
      </div>
      <Link href="/jobs/[jid]" as={jobUrl}>
        <a className="Content">
          <Translator>
            {sanitize(props.description, [])["__html"].substring(0, 300)}...
          </Translator>
        </a>
      </Link>

      <div className="JobListItemFooter">
        <div className="row">
          <JobPerksBubbles perks={props.perks} />
        </div>
        <div className="row">
          <p className="PostDate">{moment(props.date).fromNow()}</p>

          <PrompToRegister>
            <FavoriteButton
              jobId={props.id}
              count={props.favorites}
              showFavoritesCount={props.showFavoritesCount}
            />
          </PrompToRegister>
        </div>
      </div>
      <style jsx>{`
        a {
          color: ${variables.darkColor};
          font-size: 1em;
          text-decoration: none;
        }

        .JobListItemHeader {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .JobListItemHeader .JobTitle {
          font-weight: bold;
          text-decoration: none;
          color: ${variables.accentColor2};
          font-size: 1.2em;
        }

        .JobListItemHeader .JobTitle:hover {
          border-bottom: 1px solid red;
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
        }

        .JobListItemFooter .row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          margin-top: 5px;
          width: 100%;
        }

        .JobListItemFooter a {
          font-weight: bold;
          text-decoration: none;
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
          }

          .JobListItemMainInfo :global(> span:nth-child(2)) {
            margin-left: 0;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }

          .JobListItemMainInfo :global(> span:nth-child(1)) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-top-left-radius: 0;
          }
        }
      `}</style>
    </Card>
  );
};

export default jobListItem;
