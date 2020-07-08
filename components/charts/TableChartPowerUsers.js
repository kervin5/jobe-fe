import React from "react";
import { STATS_POWER_USERS } from "@/graphql/queries/stats";
import QueryTableChart from "@/components/charts/queryCharts/QueryTableChart";

const TableChartPowerUsers = () => {
  return (
    <QueryTableChart
      query={STATS_POWER_USERS}
      keys={{ label: "name", count: "score" }}
    />
  );
};

export default TableChartPowerUsers;
