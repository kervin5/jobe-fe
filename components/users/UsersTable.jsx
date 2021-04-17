import React from "react";

import { gql } from "@apollo/client";

import appText from "@/lang/appText";

import UserActionButtons from "./UserActionButtons/UserActionButtons";
import Link from "next/link";
import TableGraphqlWithQuery from "@/common/UI/Tables/TableGraphqlWithQuery";
import Button from "@material-ui/core/Button";

const USERS_QUERY = gql`
  query USERS_QUERY($take: Int!, $skip: Int!, $query: String!) {
    users(
      take: $take
      skip: $skip
      where: {
        OR: [{ name: { contains: $query } }, { email: { contains: $query } }]
      }
    ) {
      id
      name
      email
      status
      role {
        id
        name
      }
      branch {
        id
        name
      }
    }
  }
`;

const USERS_CONNECTION_QUERY = gql`
  query USERS_CONNECTION_QUERY($query: String!) {
    usersConnection(
      where: {
        OR: [{ name: { contains: $query } }, { email: { contains: $query } }]
      }
    )
  }
`;

const UsersTable = (props) => {
  return (
    <TableGraphqlWithQuery
      dataQuery={USERS_QUERY}
      countQuery={USERS_CONNECTION_QUERY}
      searchFilter={(value) => ({ query: value })}
      rowFormat={(user, queries) => ({
        name: user.name,
        email: <a href={`malito:${user.email}`}>{user.email}</a>,
        role: user.role ? user.role.name : "",
        status: user.status,
        branch: user.branch ? user.branch.name : "",
        actions: <UserActionButtons user={user} refetchQueries={queries} />,
      })}
      toolbar={
        <Link href="/admin/users/new" passHref>
          <Button variant="contained" color="primary" as="a">
            {appText.actions.add + " " + appText.objects.user.singular}
          </Button>
        </Link>
      }
    />
  );
};

export default UsersTable;
// };
