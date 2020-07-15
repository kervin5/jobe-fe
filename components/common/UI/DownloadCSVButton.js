import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { CSVDownload } from "react-csv";
import { Button } from "semantic-ui-react";
import appText from "@/lang/appText";

const DownloadCSVButton = ({ queryData }) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [getData, { error, loading, data }] = useLazyQuery(queryData?.query, {
    variables: queryData?.variables,
  });

  const handleClick = () => {
    getData();
    updateFetchedData();
  };

  useEffect(() => {
    if (data) {
      updateFetchedData();
    }
  }, [error, loading, data]);

  const updateFetchedData = () => {
    setTimeout(() => setFetchedData(null), 0);
    if (data) {
      const [dataKey] = Object.keys(data);
      setTimeout(() => setFetchedData(data[dataKey]), 10);
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="grey"
        disabled={loading}
        loading={loading}
      >
        {appText.actions.download}
      </Button>
      {fetchedData && <CSVDownload data={fetchedData} target="_blank" />}
    </>
  );
};

export default DownloadCSVButton;
