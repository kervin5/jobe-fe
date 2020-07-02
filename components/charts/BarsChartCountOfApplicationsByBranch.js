import React from "react";

import { STATS_APPLICATIONS_COUNT_BY_BRANCH } from "@/graphql/queries/stats";
import QueryBarChart from "./queryCharts/QueryBarChart";

const BarsChartCountOfApplications = ({ query, sortBy }) => {
  return (
    <QueryBarChart query={STATS_APPLICATIONS_COUNT_BY_BRANCH} orderBy="NEW" />
  );
};

export default BarsChartCountOfApplications;
