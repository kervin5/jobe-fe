import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Button,
  Checkbox,
  Icon,
  Table,
  Dimmer,
  Loader,
  Segment,
} from "semantic-ui-react";
import { ALL_BRANCHES_QUERY } from "@/graphql/queries/branches";
import { SINGLE_USER_QUERY } from "@/graphql/queries/users";
import { UPDATE_USER_MUTATION } from "@/graphql/mutations/users";

import appText from "@/lang/appText";

const SaveBrancheChangesBtn = ({ userId, changes }) => {
  const [updateBranchAccessMutation, { error, loading, data }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      refetchQueries: [{ query: SINGLE_USER_QUERY, variables: { id: userId } }],
    }
  );

  const handleClick = () => {
    const otherBranches = Object.keys(changes).map((branchKey) => ({
      id: branchKey,
      active: changes[branchKey],
    }));
    console.log(otherBranches);
    updateBranchAccessMutation({
      variables: { id: userId, otherBranches },
    });
  };

  const valuesWereChanged = !!Object.keys(changes).length;
  return (
    <Button
      floated="right"
      icon
      labelPosition="left"
      primary
      size="small"
      disabled={!valuesWereChanged || loading}
      onClick={handleClick}
    >
      <Icon name="save" />
      {appText.actions.save}
    </Button>
  );
};

const BranchesAccessPanel = ({ selected, userId }) => {
  const { error, loading, data } = useQuery(ALL_BRANCHES_QUERY);
  const [changes, setChanges] = useState({});

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

  if (loading)
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted content="Loading" />
        </Dimmer>
      </Segment>
    );
  return (
    <Table celled compact definition>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell>{appText.adjectives.active}</Table.HeaderCell>
          <Table.HeaderCell>{appText.objects.branch.singular}</Table.HeaderCell>
          <Table.HeaderCell>{appText.adjectives.primary}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.branches.map((branch, index) => (
          <Table.Row key={"Branch" + branch.name + index}>
            <Table.Cell collapsing>
              <Checkbox
                toggle
                defaultChecked={!!enabled[branch.id]}
                onChange={(e, data) => handleToggleChange(data)}
                value={branch.id}
                disabled={!!enabled[branch.id] && !!enabled[branch.id].primary}
              />
            </Table.Cell>
            <Table.Cell>{branch.name}</Table.Cell>
            <Table.Cell>
              {enabled[branch.id] && enabled[branch.id].primary ? (
                <Icon name="check" />
              ) : (
                ""
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan="4">
            <SaveBrancheChangesBtn changes={changes} userId={userId} />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default BranchesAccessPanel;
