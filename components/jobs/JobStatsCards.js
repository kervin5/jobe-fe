import React from "react";
import Link from "next/link";
import { Grid } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import CounterCard from "@/common/UI/CounterCard";
import { SINGLE_JOB_QUERY } from "@/graphql/queries/jobs";
import appText from "@/lang/appText";

const JobStatsCards = ({ jobId }) => {
  const { error, loading, data } = useQuery(SINGLE_JOB_QUERY, {
    variables: { id: jobId },
  });

  return (
    <Grid columns={3} stackable>
      <Grid.Row>
        <Grid.Column>
          <CounterCard
            value={data?.job?.views ?? 0}
            label={appText.objects.view.plural}
            loading={loading}
            icon="eye"
            color="2"
          />
        </Grid.Column>
        <Grid.Column>
          <Link href={`/admin/jobs/${jobId}/applications`}>
            <a>
              <CounterCard
                value={data?.job?.applications?.length ?? 0}
                label={appText.objects.application.plural}
                loading={loading}
              />
            </a>
          </Link>
        </Grid.Column>
        <Grid.Column>
          <CounterCard
            value={data?.job?.favorites?.length ?? 0}
            label={appText.objects.favorite.plural}
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
