import React from "react";
import LineChart from "@/components/charts/templates/LineChart";
import { useQuery } from "@apollo/client";

const QueryLineChart = ({ query, keys }) => {
  const { error, loading, data } = useQuery(query);
  if (loading) return <p>Cargando...</p>;
  if (!data) return null;
  const [queryKey] = Object.keys(data);
  const chartData = formatData(data[queryKey], keys);

  return (
    <div style={{ height: "200px", width: "100%" }}>
      <LineChart data={chartData.data} keys={chartData.keys} />
    </div>
  );
};

function formatData(data, keys) {
  if (!data) return [];
  const chartData = data.map((dataItem) => ({
    name: dataItem.label,
    [keys.count]: dataItem.count,
    [keys.count2]: dataItem.count2,
    amt: dataItem.count + dataItem.count2,
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
