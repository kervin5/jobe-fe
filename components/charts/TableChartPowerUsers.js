import React from "react";
import { STATS_POWER_USERS } from "@/graphql/queries/stats";
import QueryTableChart from "@/components/charts/queryCharts/QueryTableChart";
import appText from "@/lang/appText";

const TableChartPowerUsers = () => {
  return (
    <QueryTableChart
      query={STATS_POWER_USERS}
      keys={{
        label: appText.objects.name.singular,
        count: appText.objects.score.singular,
      }}
    />
  );
};

export default TableChartPowerUsers;
