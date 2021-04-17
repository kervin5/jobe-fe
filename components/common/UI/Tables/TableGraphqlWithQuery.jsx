import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import { take } from "@/root/config";
import Table from "@/common/UI/Tables/Table";
import appText from "@/lang/appText";
import DownloadCSVButton from "@/common/UI/DownloadCSVButton";
import styled from "styled-components";
// import PerksActionButtons from "./PerksActionButtons";

const StyledToolbar = styled.div`
  display: flex;
  & > * {
    margin-left: 20px;
  }

  a,
  button,
  .ui.button {
    margin-left: 10px;
    margin-right: 0;
    display: inline-block;
    align-self: center;
    margin-top: 6px;
  }
`;

const TableGraphqlWithQuery = ({
  dataQuery,
  countQuery,
  rowFormat,
  toolbar,
  searchFilter = () => {},
  variables,
  headers,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const recordsVariables = {
    variables: {
      ...variables,
      ...searchFilter(query),
      take,
      skip: (currentPage - 1) * take,
    },
  };
  const countVariables = {
    variables: { ...searchFilter(query), ...variables },
  };
  const resRecords = useQuery(dataQuery, recordsVariables);
  const resCount = useQuery(countQuery, countVariables);

  const turnPageHandler = (pageNumber) => {
    setCurrentPage(parseInt(pageNumber));
  };

  const inputChangeHandler = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [variables]);

  if (resCount.error || resRecords.error)
    return <p>Something went wrong ...</p>;

  const [recordsKey] = resRecords.data
    ? Object.keys(resRecords.data)
    : [undefined];
  const [countKey] = resCount.data ? Object.keys(resCount.data) : [undefined];
  let records = recordsKey
    ? resRecords.data?.[recordsKey].map((record) => {
        return rowFormat(record, [
          { query: dataQuery, variables: { ...recordsVariables.variables } },
          {
            query: countQuery,
            variables: { ...countVariables.variables },
          },
        ]);
      })
    : [];
  const count = countKey ? resCount?.data?.[countKey] : 0;

  return (
    <>
      <Table
        data={records}
        page={currentPage}
        loading={resRecords?.loading}
        count={count}
        take={take}
        turnPageHandler={turnPageHandler}
        headers={headers}
        toolbar={
          <>
            <TextField
              onChange={inputChangeHandler}
              id="outlined-basic"
              label={appText.actions.search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
                ),
              }}

              placeholder={appText.actions.search}
            />
            <StyledToolbar>
              {toolbar}
              <DownloadCSVButton
                queryData={{
                  query: dataQuery,
                  ...countVariables,
                }}
                rowFormat={rowFormat}
              />
            </StyledToolbar>
          </>
        }
      />
    </>
  );
};

export default TableGraphqlWithQuery;
// };
