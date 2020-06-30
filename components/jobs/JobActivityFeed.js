import React from "react";
import moment from "moment";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { Feed } from "semantic-ui-react";
import { SINGLE_JOB_QUERY } from "@/graphql/queries/jobs";

import Title from "@/common/UI/Title";

const events = [
  {
    date: "1 Hour Ago",
    icon: "thumbs up outline",
    meta: "4 Likes",
    summary: "Elliot Fu added you as a friend"
  },
  {
    date: "4 days ago",
    image: "/images/avatar/small/helen.jpg",
    meta: "1 Like",
    summary: "Helen Troy added 2 new illustrations",
    extraImages: [
      "/images/wireframe/image.png",
      "/images/wireframe/image-text.png"
    ]
  },
  {
    date: "3 days ago",
    image: "/images/avatar/small/joe.jpg",
    meta: "8 Likes",
    summary: "Joe Henderson posted on his page",
    extraText:
      "Ours is a life of constant reruns. We're always circling back to where we'd we started."
  },
  {
    date: "4 days ago",
    image: "/images/avatar/small/justen.jpg",
    meta: "41 Likes",
    summary: "Justen Kitsune added 2 new photos of you",
    extraText:
      "Look at these fun pics I found from a few years ago. Good times.",
    extraImages: [
      "/images/wireframe/image.png",
      "/images/wireframe/image-text.png"
    ]
  }
];

const StyledJobactivityFeed = styled.div`
  padding: 30px 0;
`;

const JobActivityFeed = ({ jobId }) => {
  const { error, loading, data } = useQuery(SINGLE_JOB_QUERY, {
    variables: { id: jobId }
  });

  return (
    <StyledJobactivityFeed className="JobActivityFeed">
      <Title size="m">Recent activity</Title>
      <Feed events={formatEvents(data?.job)} />
      {loading && <p>Loading...</p>}
    </StyledJobactivityFeed>
  );
};

function formatEvents(data) {
  if (data) {
    return data.applications.map(application => ({
      key: application.id,
      date: moment(application.createdAt).fromNow(),
      icon: "thumbs up outline",
      // meta: "4 Likes",
      summary: (
        <p>
          {application.user.name}{" "}
          <Link
            href={"/admin/applications/"}
            as={"/admin/applications/" + application.id}
          >
            <a>applied</a>
          </Link>{" "}
          to this job.
        </p>
      )
    }));
  }
  return [];
}

export default JobActivityFeed;
