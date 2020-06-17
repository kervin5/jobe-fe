import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Input } from "semantic-ui-react";
import { take } from "../../config";
import Router from "next/router";
import Table from "../common/UI/Table";
import Loader from "../common/UI/Animated/Loader";
import UserActionButtons from "../users/UserActionButtons/UserActionButtons";
import Button from "../common/UI/Button";
// import Button from "../common/UI/Button";

const ALL_PERKS_QUERY = gql`
  query ALL_PERKS_QUERY($take: Int!, $skip: Int!) {
    perks(take: $take, skip: $skip) {
      id
      name
      status
    }
  }
`;

const PERKS_CONNECTION_QUERY = gql`
  query PERKS_CONNECTION_QUERY {
    perksConnection
  }
`;

const PerksTable = props => {
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
      <Query query={PERKS_CONNECTION_QUERY} ssr={false} variables={{ query }}>
        {perksConnectionData => {
          if (perksConnectionData.error) return <p>Something went wrong ...</p>;
          const queryVariables = {
            take,
            skip: (currentPage - 1) * take,
            query
          };
          return (
            <Query query={ALL_PERKS_QUERY} variables={{ ...queryVariables }}>
              {({ error, loading, data }) => {
                if (error) return <p>Something Went Wrong...</p>;

                let perks = [];

                data?.perks.forEach(perk => {
                  return perks.push({
                    name: perk.name,

                    status: perk.status

                    // actions: (
                    //   <UserActionButtons
                    //     user={user}
                    //     refetchQueries={[
                    //       {
                    //         query: ALL_PERKS_QUERY,
                    //         variables: { ...queryVariables },
                    //       },
                    //       {
                    //         query: PERKS_CONNECTION_QUERY,
                    //         variables: { query },
                    //       },
                    //     ]}
                    //   />
                    // ),
                  });
                });

                const count = perksConnectionData?.data?.perksConnection ?? 0;

                return (
                  <Table
                    data={perks}
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
                        <Button
                          onClick={() => Router.push("/dashboard/users/new")}
                        >
                          Add Perk
                        </Button>
                      </>
                    }
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

export default PerksTable;
// };
