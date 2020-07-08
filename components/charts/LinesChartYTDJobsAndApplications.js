import React from "react";
import QueryLineChart from "./queryCharts/QueryLineChart";
import { STATS_YTD_JOB_APPLICATIONS_COUNT } from "@/graphql/queries/stats";
import appText from "@/lang/appText";

const LinesChartYTDJobsAndApplications = () => {
  return (
    <QueryLineChart
      query={STATS_YTD_JOB_APPLICATIONS_COUNT}
      keys={{
        count: appText.objects.application.plural,
        count2: appText.objects.job.plural,
      }}
    />
  );
};

export default LinesChartYTDJobsAndApplications;
