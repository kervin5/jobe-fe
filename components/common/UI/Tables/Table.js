import React, { useEffect, useState } from "react";
import { Icon, Table, Pagination, Loader } from "semantic-ui-react";
import styled from "styled-components";
import appText from "@/lang/appText";

const TableWithPagination = ({
  data,
  take,
  count,
  turnPageHandler,
  page,
  loading,
  withid,
  exclude = [],
  toolbar,
  headers,
}) => {
  const pages = Math.ceil(count / take);
  const handlePaginationChange = (e, { activePage }) => {
    turnPageHandler(activePage);
  };

  return (
    <div className="CustomTable">
      <div className="CustomTable__tooblar">{toolbar}</div>
      {loading && <p>Loading...</p>}
      {data?.length === 0 && !loading && <p>{appText.messages.notfound}</p>}
      {data?.length > 0 && (
        <Table selectable>
          <Table.Header>
            <Table.Row>
              {Object.keys(data[0])
                .filter(
                  (header) =>
                    ((withid && header === "id") ||
                      (header !== "__typename" && header !== "id")) &&
                    !exclude.includes(header)
                )
                .map((header, key) => (
                  <Table.HeaderCell key={header + key}>
                    {headers?.[header] ?? jsUcfirst(header)}
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
                      (rowName) =>
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
                    icon: true,
                  }}
                  firstItem={{
                    content: <Icon name="angle double left" />,
                    icon: true,
                  }}
                  lastItem={{
                    content: <Icon name="angle double right" />,
                    icon: true,
                  }}
                  prevItem={{ content: <Icon name="angle left" />, icon: true }}
                  nextItem={{
                    content: <Icon name="angle right" />,
                    icon: true,
                  }}
                  totalPages={pages}
                  onPageChange={handlePaginationChange}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      )}
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

const StyledOrderByHeader = styled.p`
  white-space: nowrap;
  cursor: pointer;
`;

export const OrderByHeader = ({ children, action, column, activeColumn }) => {
  const [order, setOrder] = useState("DESC");
  const allowedValues = [`${column} DESC`, `${column} ASC`];
  const isActive = allowedValues.includes(activeColumn);
  const handleClick = () => {
    if (order === "DESC") {
      setOrder("ASC");
    } else {
      setOrder("DESC");
    }
  };

  useEffect(() => {
    if (action) action(`${column} ${order}`);
  }, [order]);

  return (
    <StyledOrderByHeader onClick={handleClick}>
      {children}{" "}
      {isActive &&
        (order === "DESC" ? (
          <Icon name="long arrow alternate down" />
        ) : (
          <Icon name="long arrow alternate up" />
        ))}
    </StyledOrderByHeader>
  );
};

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default TableWithPagination;
