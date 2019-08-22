import React, { useState } from "react";
import { Icon, Table, Pagination } from "semantic-ui-react";

const TableWithPagination = ({
  data,
  perPage,
  count,
  turnPageHandler,
  page
}) => {
  const pages = Math.ceil(count / perPage);
  const handlePaginationChange = (e, { activePage }) => {
    turnPageHandler(activePage);
  };

  if (!data || data.length === 0) return <p>No Data To Show</p>;
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {Object.keys(data[0])
            .filter(header => header !== "__typename")
            .map((header, key) => (
              <Table.HeaderCell key={header + key}>
                {jsUcfirst(header)}
              </Table.HeaderCell>
            ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((row, key) => (
          <Table.Row key={"Row" + key}>
            {Object.keys(row)
              .filter(rowName => rowName !== "__typename")
              .map((column, index) => {
                return (
                  <Table.Cell key={row + key + column + index}>
                    {row[column]}
                  </Table.Cell>
                );
              })}
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan={Object.keys(data[0]).length}>
            <Pagination
              floated="right"
              defaultActivePage={page}
              ellipsisItem={{
                content: <Icon name="ellipsis horizontal" />,
                icon: true
              }}
              firstItem={{
                content: <Icon name="angle double left" />,
                icon: true
              }}
              lastItem={{
                content: <Icon name="angle double right" />,
                icon: true
              }}
              prevItem={{ content: <Icon name="angle left" />, icon: true }}
              nextItem={{ content: <Icon name="angle right" />, icon: true }}
              totalPages={pages}
              onPageChange={handlePaginationChange}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default TableWithPagination;
