import React from "react";
import { Icon, Table, Pagination, Loader, Dimmer } from "semantic-ui-react";

const TableWithPagination = ({
  data,
  take,
  count,
  turnPageHandler,
  page,
  loading,
  withid,
  exclude = [],
  toolbar
}) => {
  const pages = Math.ceil(count / take);
  const handlePaginationChange = (e, { activePage }) => {
    turnPageHandler(activePage);
  };

  if (!data || data.length === 0) return <p>No Data To Show</p>;
  return (
    <div className="CustomTable">
      <div className="CustomTable__tooblar">{toolbar}</div>
      <Table selectable>
        <Table.Header>
          <Table.Row>
            {Object.keys(data[0])
              .filter(
                header =>
                  ((withid && header === "id") ||
                    (header !== "__typename" && header !== "id")) &&
                  !exclude.includes(header)
              )
              .map((header, key) => (
                <Table.HeaderCell key={header + key}>
                  {jsUcfirst(header)}
                </Table.HeaderCell>
              ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {loading ? (
            <Table.Row>
              <Table.Cell>
                <Loader active inline="centered" />
              </Table.Cell>
            </Table.Row>
          ) : (
            data.map((row, key) => (
              <Table.Row key={"Row" + key}>
                {Object.keys(row)
                  .filter(
                    rowName =>
                      ((withid && rowName === "id") ||
                        (rowName !== "__typename" && rowName !== "id")) &&
                      !exclude.includes(rowName)
                  )
                  .map((column, index) => {
                    return (
                      <Table.Cell key={"Column" + key + column + index}>
                        {row[column]}
                      </Table.Cell>
                    );
                  })}
              </Table.Row>
            ))
          )}
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
      <style jsx>{`
        .CustomTable__tooblar {
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default TableWithPagination;
