import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Input } from "semantic-ui-react";
import { first } from "../../config";

import Table from "../common/UI/Table";
import Loader from "../common/UI/Animated/Loader";
import UserActionButtons from "./UserActionButtons/UserActionButtons";
// import Button from "../common/UI/Button";

const USER_QUERY = gql`
  query USER_QUERY($first: Int!, $skip: Int!, $query: String!) {
    users(
      first: $first
      skip: $skip
      where: {
        AND: [
          {
            OR: [
              { name: { contains: $query } }
              { email: { contains: $query } }
            ]
          }
          { NOT: { status: DELETED } }
        ]
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
    <>
      <Input
        icon="search"
        placeholder="Search..."
        onChange={inputChangeHandler}
      />
      <Query query={USERS_CONNECTION_QUERY} ssr={false} variables={{ query }}>
        {userConnectionData => {
          if (userConnectionData.error) return <p>Something went wrong ...</p>;
          if (userConnectionData.loading) return <Loader />;
          const queryVariables = {
            first,
            skip: (currentPage - 1) * first,
            jobId: "" || props.jobId,
            query
          };
          return (
            <Query query={USER_QUERY} variables={{ ...queryVariables }}>
              {({ error, loading, data }) => {
                if (error) return <p>Something Went Wrong...</p>;
                if (loading) return <Loader />;

                let users = [];

                data.users.forEach(user => {
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

                const count = userConnectionData.data.usersConnection;

                return (
                  <Table
                    data={users}
                    page={currentPage}
                    loading={loading}
                    count={count}
                    first={first}
                    turnPageHandler={turnPageHandler}
                  />
                );
              }}
            </Query>
          );
        }}
      </Query>
    </>
  );
};

export default UsersTable;
// };
