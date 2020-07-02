import React from "react";
import { useQuery } from "@apollo/client";
import { APPLICATIONS_COUNT_BY_BRANCH } from "@/graphql/queries/applications";
import BarChart from "./templates/BarChart";

const BarsChartCountOfApplications = () => {
  const { error, loading, data } = useQuery(APPLICATIONS_COUNT_BY_BRANCH);

  const chartData = generateData(data?.applicationsByBranch);

  if (loading) return <p>Loading...</p>;
  return (
    <div style={{ height: "900px", width: "100%" }}>
      <BarChart data={chartData.data} keys={chartData.keys} />
    </div>
  );
};

function generateData(data) {
  if (!data) return [];
  const chartData = [];
  const statusList = data.reduce(
    (result, branchRecord) => {
      if (!result[branchRecord.status]) {
        result[branchRecord.status] = 0;
      }
      return result;
    },
    { NEW: 0, VIEWED: 0, CONTACTED: 0, REVIEWING: 0, HIRED: 0, ARCHIVED: 0 }
  );

  const branchesList = data.reduce((result, branchRecord) => {
    if (!result[branchRecord.name]) {
      result[branchRecord.name] = { ...statusList, amt: 0 };
    }

    result[branchRecord.name][branchRecord.status] = branchRecord.applications;

    return result;
  }, {});

  Object.keys(branchesList).forEach(branchName => {
    chartData.push({
      name: branchName,
      ...branchesList[branchName],
      amt: 10000
    });
  });

  chartData.sort((itemA, itemB) => {
    // const ItemATotal = Object.values(itemA).reduce((acc, value) => {
    //   if (isNaN(value)) {
    //     return acc;
    //   }

    //   return acc + value;
    // }, 0);

    // const ItemBTotal = Object.values(itemB).reduce((acc, value) => {
    //   if (isNaN(value)) {
    //     return acc;
    //   }

    //   return acc + value;
    // }, 0);

    return itemB["NEW"] - itemA["NEW"];
  });

  return {
    data: chartData,
    keys: Object.keys(statusList).map(key => ({
      key,
      color: "#" + ((Math.random() * 0xffffff) << 0).toString(16)
    }))
  };
}

export default BarsChartCountOfApplications;
