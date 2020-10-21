import React, { useEffect, useState } from "react";

import styled from "styled-components";
import appText from "@/lang/appText";
import TableHead from "@material-ui/core/TableHead";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {},
});

export default function CustomTable({
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
  title,
}) {
  const classes = useStyles2();

  const [rowsPerPage, setRowsPerPage] = React.useState(take);

  const handleChangePage = (event, newPage) => {
    turnPageHandler(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
  };

  // useEffect(() => {
  //   setPage(currentPage + 1);
  // }, [currentPage]);

  // useEffect(() => {
  //   setPerPage(rowsPerPage);
  // }, [rowsPerPage]);

  if (loading && !data.length) return <p>Loading</p>;
  // if (error) return <p>Something went wrong</p>;

  return (
    <Paper>
      {title && <h1>{title}</h1>}
      <div className="CustomTable__tooblar">{toolbar}</div>
      {loading && <p>Loading...</p>}
      {data?.length === 0 && !loading && <p>{appText.messages.notfound}</p>}

      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {Object.keys(data[0])
              .filter(
                (header) =>
                  ((withid && header === "id") ||
                    (header !== "__typename" && header !== "id")) &&
                  !exclude.includes(header)
              )
              .map((header, key) => (
                <TableCell key={header + key}>
                  {headers?.[header] ?? jsUcfirst(header)}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, key) => (
            <TableRow key={"Row" + key}>
              {Object.keys(row)
                .filter(
                  (rowName) =>
                    ((withid && rowName === "id") ||
                      (rowName !== "__typename" && rowName !== "id")) &&
                    !exclude.includes(rowName)
                )
                .map((column, index) => {
                  return (
                    <TableCell key={"Column" + key + column + index}>
                      {row[column]}
                    </TableCell>
                  );
                })}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              // colSpan={3}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
}

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
        (order === "DESC" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />)}
    </StyledOrderByHeader>
  );
};

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
