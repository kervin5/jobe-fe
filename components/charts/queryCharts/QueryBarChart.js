import React from "react";
import { useQuery } from "@apollo/client";
import BarChart from "@/components/charts/templates/BarChart";
import { getColor } from "@/components/charts/chartGlobals";

const QueryBarChart = ({ query, orderBy }) => {
  const { error, loading, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (!data) return null;
  const [queryKey] = Object.keys(data);
  const chartData = generateData(data[queryKey], orderBy);

  return (
    <div style={{ height: "900px", width: "100%" }}>
      <BarChart data={chartData.data} keys={chartData.keys} />
    </div>
  );
};

function generateData(data, orderBy) {
  if (!data) return [];
  const chartData = [];
  const statusList = data.reduce(
    (result, branchRecord) => {
      if (!result[branchRecord.status]) {
        result[branchRecord.status] = 0;
      }
      return result;
    },
    { [orderBy]: 2 }
    // { NEW: 0, VIEWED: 0, CONTACTED: 0, REVIEWING: 0, HIRED: 0, ARCHIVED: 0 }
  );

  const branchesList = data.reduce((result, branchRecord) => {
    if (!result[branchRecord.name]) {
      result[branchRecord.name] = { ...statusList, amt: 0 };
    }

    result[branchRecord.name][branchRecord.status] = branchRecord.count;

    return result;
  }, {});

  Object.keys(branchesList).forEach((branchName) => {
    chartData.push({
      name: branchName,
      ...branchesList[branchName],
      amt: 10000,
    });
  });

  chartData.sort((itemA, itemB) => {
    return itemB[orderBy] - itemA[orderBy];
  });

  return {
    data: chartData,

    keys: Object.keys(statusList).map((key, index) => ({
      key,
      color: getColor(index),
    })),
  };
}

export default QueryBarChart;
