import React from "react";
import { Grid } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import CounterCard from "@/common/UI/CounterCard";
import { SINGLE_JOB_QUERY } from "@/graphql/queries/jobs";

const JobStatsCards = ({ jobId }) => {
  const { error, loading, data } = useQuery(SINGLE_JOB_QUERY, {
    variables: { id: jobId }
  });

  return (
    <Grid columns={3} stackable>
      <Grid.Row>
        <Grid.Column>
          <CounterCard
            value={data?.job?.views ?? 0}
            label="Views"
            loading={loading}
            icon="eye"
            color="2"
          />
        </Grid.Column>
        <Grid.Column>
          <CounterCard
            value={data?.job?.applications?.length ?? 0}
            label="Apps"
            loading={loading}
          />
        </Grid.Column>
        <Grid.Column>
          <CounterCard
            value={data?.job?.favorites?.length ?? 0}
            label="Favorites"
            loading={loading}
            icon="heart"
            color="3"
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default JobStatsCards;
