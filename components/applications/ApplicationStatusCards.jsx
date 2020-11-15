import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import ApplicationStatusCard from "./ApplicationStatusCard";
import appText from "@/lang/appText";

const StyledApplicationStatusCards = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const ApplicationStatusCards = ({ jobId }) => {
  return (
    <StyledApplicationStatusCards>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <ApplicationStatusCard
            label={appText.adjectives.new}
            status="NEW"
            jobId={jobId}
          />
        </Grid>
        <Grid item md={3}>
          <ApplicationStatusCard
            label={appText.adjectives.viewed}
            status="VIEWED"
            icon="eye"
            color="2"
            jobId={jobId}
          />
        </Grid>
        <Grid item md={3}>
          <ApplicationStatusCard
            label={appText.adjectives.contacted}
            status="CONTACTED"
            icon="phone"
            jobId={jobId}
          />
        </Grid>
        <Grid item md={3}>
          <ApplicationStatusCard
            label={appText.actions.reviewing}
            status="REVIEWING"
            icon="comments"
            color="3"
            jobId={jobId}
          />
        </Grid>
      </Grid>
    </StyledApplicationStatusCards>
  );
};

// export default ApplicationStatusCards;
export default ApplicationStatusCards;
