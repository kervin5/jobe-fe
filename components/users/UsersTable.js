import React, { useState } from "react";
import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";
import { Input, Button } from "semantic-ui-react";
import { take } from "@/root/config";

import Table from "@/common/UI/Table";
import UserActionButtons from "./UserActionButtons/UserActionButtons";
import Link from "next/link";
// import Button from "@/common/UI/Button";

const USER_QUERY = gql`
  query USER_QUERY($take: Int!, $skip: Int!, $query: String!) {
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

const UsersTable = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const turnPageHandler = pageNumber => {
    setCurrentPage(parseInt(pageNumber));
  };

  const inputChangeHandler = e => {
    setQuery(e.target.value);
  };

  return (
    <Query query={USERS_CONNECTION_QUERY} ssr={false} variables={{ query }}>
      {userConnectionData => {
        if (userConnectionData.error) return <p>Something went wrong ...</p>;

        const queryVariables = {
          take,
          skip: (currentPage - 1) * take,
          jobId: "" || props.jobId,
          query
        };
        return (
          <Query query={USER_QUERY} variables={{ ...queryVariables }}>
            {({ error, loading, data }) => {
              if (error) return <p>Something Went Wrong...</p>;

              let users = [];

              data?.users.forEach(user => {
                return users.push({
                  name: user.name,
                  email: <a href={`malito:${user.email}`}>{user.email}</a>,
                  role: user.role ? user.role.name : "",
                  status: user.status,
                  branch: user.branch ? user.branch.name : "",
                  actions: (
                    <UserActionButtons
                      user={user}
                      refetchQueries={[
                        {
                          query: USER_QUERY,
                          variables: { ...queryVariables }
                        },
                        {
                          query: USERS_CONNECTION_QUERY,
                          variables: { query }
                        }
                      ]}
                    />
                  )
                });
              });

              const count = userConnectionData?.data?.usersConnection ?? 0;

              return (
                <Table
                  data={users}
                  page={currentPage}
                  loading={loading}
                  count={count}
                  take={take}
                  turnPageHandler={turnPageHandler}
                  toolbar={
                    <>
                      <Input
                        icon="search"
                        placeholder="Search..."
                        onChange={inputChangeHandler}
                      />
                      <Link href="/admin/users/new" passHref>
                        <Button positive as="a">
                          Add User
                        </Button>
                      </Link>
                    </>
                  }
                />
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
};

export default UsersTable;
// };
