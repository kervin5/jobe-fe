import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import JobStatusCard from "./JobStatusCard";
import ApplicationStatusCard from "./ApplicationsStatusCard";
import appText from "@/lang/appText";

const StyledJobsStatsCards = styled.div`
  width: 100%;
  margin-bottom: 30px;

  a {
    text-decoration: none;
  }
`;

const JobsStatsCards = () => {
  return (
    <StyledJobsStatsCards>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <JobStatusCard label={appText.adjectives.posted} status="POSTED" />
        </Grid>
        <Grid item md={3}>
          <JobStatusCard
            label={appText.adjectives.draft}
            status="DRAFT"
            icon="edit"
            color="2"
          />
        </Grid>
        <Grid item md={3}>
          <JobStatusCard
            label={appText.adjectives.pending}
            status="PENDING"
            icon="comments"
            color="3"
          />
        </Grid>
        <Grid item md={3}>
          <Link href="/admin/applications">
            <a>
              <ApplicationStatusCard color="4" icon="mood" />
            </a>
          </Link>
        </Grid>
      </Grid>
    </StyledJobsStatsCards>
  );
};

// export default JobsStatsCards;
export default JobsStatsCards;
