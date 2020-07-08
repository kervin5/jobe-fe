import React from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import Link from "next/link";
import JobStatusCard from "./JobStatusCard";
import ApplicationStatusCard from "./ApplicationsStatusCard";
import appText from "@/lang/appText";

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
            <JobStatusCard label={appText.adjectives.posted} status="POSTED" />
          </Grid.Column>
          <Grid.Column>
            <JobStatusCard
              label={appText.adjectives.draft}
              status="DRAFT"
              icon="pencil"
              color="2"
            />
          </Grid.Column>
          <Grid.Column>
            <JobStatusCard
              label={appText.adjectives.pending}
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
