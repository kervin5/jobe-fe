import React from "react";
import QueryLineChart from "./queryCharts/QueryLineChart";
import { STATS_YTD_JOB_APPLICATIONS_COUNT } from "@/graphql/queries/stats";

const LinesChartYTDJobsAndApplications = () => {
  return (
    <QueryLineChart
      query={STATS_YTD_JOB_APPLICATIONS_COUNT}
      keys={{ count: "applications", count2: "jobs" }}
    />
  );
};

export default LinesChartYTDJobsAndApplications;
