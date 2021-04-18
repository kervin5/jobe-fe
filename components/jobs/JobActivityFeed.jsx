import React from "react";
import moment from "moment";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Feed from "@/common/UI/Feed";
import { SINGLE_JOB_QUERY } from "@/graphql/queries/jobs";
import appText from "@/lang/appText";

import Title from "@/common/UI/Title";

const StyledJobactivityFeed = styled.div`
  padding: 30px 0;
`;

const JobActivityFeed = ({ jobId }) => {
  const { error, loading, data } = useQuery(SINGLE_JOB_QUERY, {
    variables: { id: jobId },
  });

  return (
    <StyledJobactivityFeed className="JobActivityFeed">
      <Title level={5}>{appText.messages.recentActivity}</Title>
      <Feed events={formatEvents(data?.job)} />
      {loading && <p>Cargando...</p>}
    </StyledJobactivityFeed>
  );
};

function formatEvents(data) {
  if (data) {
    return data.applications.map((application) => ({
      key: application.id,
      date: moment(application.createdAt).fromNow(),
      icon: "thumbs up outline",
      // meta: "4 Likes",
      summary: (
        <p>
          {application.user.name}{" "}
          <Link
            href={"/admin/applications/[aid]"}
            as={"/admin/applications/" + application.id}
          >
            <a>aplicó</a>
          </Link>{" "}
          para este puesto
        </p>
      ),
    }));
  }
  return [];
}

export default JobActivityFeed;
