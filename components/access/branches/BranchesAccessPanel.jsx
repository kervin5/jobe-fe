import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BRANCHES_QUERY } from "@/graphql/queries/branches";
import appText from "@/lang/appText";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const BranchesAccessPanel = ({ selected, onChange }) => {
  const { error, loading, data } = useQuery(ALL_BRANCHES_QUERY);
  const [changes, setChanges] = useState({});
  const classes = useStyles();

  const enabled = selected.reduce((result, selectedBranch) => {
    result[selectedBranch.id] = selectedBranch;
    return result;
  }, {});

  const handleToggleChange = (data) => {
    const existingChanges = { ...changes };
    existingChanges[data.value] = data.checked;

    if (
      (enabled[data.value] && data.checked) ||
      (!enabled[data.value] && !data.checked)
    ) {
      delete existingChanges[data.value];
    }

    setChanges({ ...existingChanges });
  };

  useEffect(() => {
    if (onChange && Object.keys(changes).length) {
      const otherBranches = Object.keys(changes).map((branchKey) => ({
        id: branchKey,
        active: changes[branchKey],
      }));
      onChange(
        undefined,
        { name: "otherBranches", value: otherBranches },
        true
      );
    }
  }, [changes]);

  if (loading) return <CircularProgress />;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{appText.adjectives.active}</TableCell>
            <TableCell align="right">
              {appText.objects.branch.singular}
            </TableCell>
            <TableCell align="right">{appText.adjectives.primary}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.branches.map((branch, index) => (
            <TableRow key={"Branch" + branch.name + index}>
              <TableCell component="th" scope="row">
                <Switch
                  checked={!!enabled[branch.id]}
                  onChange={handleToggleChange}
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                  value={branch.id}
                  disabled={
                    !!enabled[branch.id] && !!enabled[branch.id].primary
                  }
                />
              </TableCell>
              <TableCell align="right">{branch.name}</TableCell>
              <TableCell align="right">
                {enabled[branch.id] && enabled[branch.id].primary ? (
                  <CheckIcon />
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BranchesAccessPanel;
