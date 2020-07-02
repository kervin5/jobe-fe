import React from "react";
import styled from "styled-components";
import JobStatusCard from "./JobStatusCard";
import ApplicationStatusCard from "./ApplicationsStatusCard";
import { Grid } from "semantic-ui-react";
import Link from "next/link";

const StyledJobsStatsCards = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const JobsStatsCards = () => {
  return (
    <StyledJobsStatsCards>
      <Grid columns="4" stackable>
        <Grid.Row>
          <Grid.Column>
            <JobStatusCard label="Posted" status="POSTED" />
          </Grid.Column>
          <Grid.Column>
            <JobStatusCard
              label="Draft"
              status="DRAFT"
              icon="pencil"
              color="2"
            />
          </Grid.Column>
          <Grid.Column>
            <JobStatusCard
              label="Pending"
              status="PENDING"
              icon="comments"
              color="3"
            />
          </Grid.Column>
          <Grid.Column>
            <Link href="/admin/applications">
              <a>
                <ApplicationStatusCard color="4" icon="smile" />
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </StyledJobsStatsCards>
  );
};

// export default JobsStatsCards;
export default JobsStatsCards;
