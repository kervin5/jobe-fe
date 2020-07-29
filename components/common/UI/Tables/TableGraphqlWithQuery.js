import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Input, Form } from "semantic-ui-react";
import { take } from "@/root/config";
import Table from "@/common/UI/Tables/Table";
import appText from "@/lang/appText";
// import PerksActionButtons from "./PerksActionButtons";

const CompaniesTable = ({
  dataQuery,
  countQuery,
  rowFormat,
  toolbar,
  searchFilter = () => {},
  variables,
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

  //if (resCount.loading || resRecords.loading) return <p>Loading</p>;
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
        toolbar={
          <>
            <Form>
              <Form.Group>
                <Form.Input
                  icon="search"
                  label={appText.actions.search}
                  placeholder={appText.actions.search}
                  onChange={inputChangeHandler}
                />
              </Form.Group>
            </Form>
            {toolbar}
          </>
        }
      />
    </>
  );
};

export default CompaniesTable;
// };
