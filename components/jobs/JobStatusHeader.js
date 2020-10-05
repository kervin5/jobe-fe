import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Title from "@/common/UI/Title";
import { SINGLE_JOB_QUERY } from "@/graphql/queries/jobs";
import appText from "@/lang/appText";

const StyledJobStatuHeader = styled.div`
  margin-bottom: 30px;

  .posted {
    color: ${(props) => props.theme.accentColor1};
  }

  .pending,
  .draft {
    color: ${(props) => props.theme.accentColor2};
  }

  .JobStatusHeader__StatusIndicator {
    text-transform: capitalize;
  }
`;

const JobStatusHeader = ({ jobId }) => {
  const { error, loading, data } = useQuery(SINGLE_JOB_QUERY, {
    variables: { id: jobId },
  });

  return (
    <StyledJobStatuHeader className="JobStatusHeader">
      <Title size="l">
        {appText.objects.status.singular}:{" "}
        <span
          className={`JobStatusHeader__StatusIndicator ${statusClass(
            data?.job.status ?? "loading"
          )}`}
        >
          {loading ? "" : data.job.status}
        </span>
      </Title>
    </StyledJobStatuHeader>
  );
};

function statusClass(status) {
  return status.toLowerCase();
}

export default JobStatusHeader;
