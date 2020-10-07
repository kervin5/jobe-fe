import React, { useState } from "react";
import { ApolloConsumer } from "@apollo/client";
import { CSVDownload } from "react-csv";
import { flattenObject } from "@/lib/objects";

import { Button } from "semantic-ui-react";
import appText from "@/lang/appText";

const ActionButton = ({ client, queryData, rowFormat }) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [getData, { error, loading, data }] = useLazyQuery(queryData?.query, {
  //   variables: queryData?.variables,
  // });

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setFetchedData(null), 0);
    client
      .query({ query: queryData.query, variables: queryData.variables })
      .then(({ data }) => {
        const [dataKey] = Object.keys(data);

        setTimeout(() => {
          const rows = data[dataKey].map(flattenObject);
          setFetchedData(rows);
        }, 10);

        setLoading(false);
        setTimeout(() => setFetchedData(null), 1000);
      });
    //   getData();
    //   updateFetchedData();
  };

  // useEffect(() => {
  //   if (data) {
  //     updateFetchedData();
  //   }
  // }, [error, loading, data]);

  // const updateFetchedData = () => {
  //   setTimeout(() => setFetchedData(null), 0);
  //   if (data) {
  //     const [dataKey] = Object.keys(data);
  //     setTimeout(() => setFetchedData(data[dataKey]), 10);
  //   }
  // };

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

const DownloadCSVButton = ({ queryData, rowFormat }) => {
  return (
    <ApolloConsumer>
      {(apolloClient) => {
        return (
          <ActionButton
            queryData={queryData}
            client={apolloClient}
            rowFormat={rowFormat}
          />
        );
      }}
    </ApolloConsumer>
  );
};

export default DownloadCSVButton;
