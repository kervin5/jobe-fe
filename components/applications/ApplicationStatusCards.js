import React from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import Link from "next/link";
import ApplicationStatusCard from "./ApplicationStatusCard";
import appText from "@/lang/appText";

const StyledApplicationStatusCards = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const JobsStatsCards = ({ jobId }) => {
  return (
    <StyledApplicationStatusCards>
      <Grid columns="4" stackable>
        <Grid.Row>
          <Grid.Column>
            <ApplicationStatusCard
              label={appText.adjectives.new}
              status="NEW"
              jobId={jobId}
            />
          </Grid.Column>
          <Grid.Column>
            <ApplicationStatusCard
              label={appText.adjectives.viewed}
              status="VIEWED"
              icon="eye"
              color="2"
              jobId={jobId}
            />
          </Grid.Column>

          <Grid.Column>
            <ApplicationStatusCard
              label={appText.adjectives.contacted}
              status="CONTACTED"
              icon="phone"
              jobId={jobId}
            />
          </Grid.Column>
          <Grid.Column>
            <ApplicationStatusCard
              label={appText.actions.reviewing}
              status="REVIEWING"
              icon="comments"
              color="3"
              jobId={jobId}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </StyledApplicationStatusCards>
  );
};

// export default JobsStatsCards;
export default JobsStatsCards;
