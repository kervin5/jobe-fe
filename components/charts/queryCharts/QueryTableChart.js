import React from "react";
import TableChart from "@/components/charts/templates/TableChart";
import { useQuery } from "@apollo/client";

const QueryLineChart = ({ query, keys }) => {
  const { error, loading, data } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  if (!data) return null;
  const [queryKey] = Object.keys(data);
  const chartData = formatData(data[queryKey], keys);

  return (
    <div style={{ height: "200px", width: "100%" }}>
      <TableChart data={chartData.data} keys={chartData.keys} />
    </div>
  );
};

function formatData(data, keys) {
  if (!data) return [];
  const chartData = data.map((dataItem) => ({
    name: dataItem.label,
    name2: dataItem.label2,
    value: dataItem.count,
  }));

  return {
    data: chartData,
    keys: Object.values(keys).map((key) => ({
      key,
      color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
    })),
  };
}

export default QueryLineChart;
