import React from "react";

// import classes from './JobListItem.module.scss';
import variables from "../../common/globalVariables";
import moment from "moment";
import Bubble from "../../common/UI/Bubble";
import Icon from "../../common/UI/Icon";
import FavoriteButton from "../../common/UI/FavoriteButton";
import Card from "../../common/UI/Card";
import Link from "next/link";

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
  const jobUrl = "/jobs/" + props.title.split(" ").join("-") + "-" + props.id;
  return (
    <Card styles={styles} animate>
      <div className="JobListItemHeader">
        <div>
          <Link href="/jobs/[jid]" as={jobUrl}>
            <a className="JobTitle">{props.title}</a>
          </Link>
          <p className="Location">
            <Icon icon="marker" size="sm" className="LocationIcon" />{" "}
            {shortLocation}
          </p>
        </div>
        <div className="JobListItemMainInfo">
          <Bubble color="1">${props.compensation}</Bubble>
          <Bubble color="2">{props.type}</Bubble>
        </div>
      </div>
      <Link href="/jobs/[jid]" as={jobUrl}>
        <a className="Content">{props.description.substr(1, 200)}...</a>
      </Link>

      <div className="JobListItemFooter">
        <p className="PostDate">{moment(props.date).fromNow()}</p>
        <FavoriteButton jobId={props.id} />
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
        }

        .Content {
          font-weight: normal;
          font-size: 1em;
          // letter-spacing: 0.1em;
          line-height: 1.4em;
        }

        .LocationIcon {
          opacity: 0.4;
        }

        .LikeIcon {
          opacity: 0.4;
        }

        .JobListItemFooter {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          margin-top: 5px;
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
      `}</style>
    </Card>
  );
};

export default jobListItem;
