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

const JobsStatsCards = () => {
  return (
    <StyledApplicationStatusCards>
      <Grid columns="4" stackable>
        <Grid.Row>
          <Grid.Column>
            <ApplicationStatusCard
              label={appText.adjectives.new}
              status="NEW"
            />
          </Grid.Column>
          <Grid.Column>
            <ApplicationStatusCard
              label={appText.adjectives.viewed}
              status="VIEWED"
              icon="eye"
              color="2"
            />
          </Grid.Column>

          <Grid.Column>
            <ApplicationStatusCard
              label={appText.adjectives.contacted}
              status="CONTACTED"
              icon="phone"
            />
          </Grid.Column>
          <Grid.Column>
            <ApplicationStatusCard
              label={appText.actions.reviewing}
              status="REVIEWING"
              icon="comments"
              color="3"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </StyledApplicationStatusCards>
  );
};

// export default JobsStatsCards;
export default JobsStatsCards;
