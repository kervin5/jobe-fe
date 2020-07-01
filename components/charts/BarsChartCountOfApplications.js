import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_APPLICATIONS_QUERY } from "@/graphql/queries/applications";
import BarChart from "./templates/BarChart";

const BarsChartCountOfApplications = () => {
  const { error, loading, data } = useQuery(ALL_APPLICATIONS_QUERY);

  const chartData = generateData(data?.applications);

  if (loading) return <p>Loading...</p>;
  return <BarChart data={chartData.data} keys={chartData.keys} />;
};

function generateData(data) {
  if (!data) return [];
  const chartData = [];
  const statusList = data.reduce((result, application) => {
    if (!result[application.status]) {
      result[application.status] = 0;
    }
    return result;
  }, {});

  console.log(statusList);

  const branchesList = data.reduce((result, application) => {
    if (!result[application.job.branch.name]) {
      result[application.job.branch.name] = {};
    }

    if (
      typeof result[application.job.branch.name][application.status] ===
      "undefined"
    ) {
      result[application.job.branch.name][application.status] = 0;
    } else {
      // console.log(result[application.job.branch.name][application.status]);
      result[application.job.branch.name][application.status] += 1;
    }

    return result;
  }, {});

  Object.keys(branchesList).forEach(branchName => {
    chartData.push({
      name: branchName,
      ...statusList,
      ...branchesList[branchName],
      amt: data.length
    });
  });

  chartData.sort((itemA, itemB) => {
    const ItemATotal = Object.values(itemA).reduce((acc, value) => {
      if (isNaN(value)) {
        return acc;
      }

      return acc + value;
    }, 0);

    const ItemBTotal = Object.values(itemB).reduce((acc, value) => {
      if (isNaN(value)) {
        return acc;
      }

      return acc + value;
    }, 0);

    console.log(ItemATotal < ItemBTotal);
    return ItemBTotal - ItemATotal;
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
