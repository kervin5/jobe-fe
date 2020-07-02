import React from "react";
import { STATS_JOBS_COUNT_BY_BRANCH } from "@/graphql/queries/stats";
import QueryBarChart from "./queryCharts/QueryBarChart";

const BarsChartCountOfApplications = ({ query, sortBy }) => {
  return <QueryBarChart query={STATS_JOBS_COUNT_BY_BRANCH} orderBy="POSTED" />;
};

export default BarsChartCountOfApplications;
