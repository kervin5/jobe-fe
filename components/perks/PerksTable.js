import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Input } from "semantic-ui-react";
import { take } from "../../config";

import Table from "../common/UI/Table";
import Loader from "../common/UI/Animated/Loader";
import UserActionButtons from "../users/UserActionButtons/UserActionButtons";
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
          if (perksConnectionData.loading) return <Loader />;
          const queryVariables = {
            take,
            skip: (currentPage - 1) * take,
            query
          };
          return (
            <Query query={ALL_PERKS_QUERY} variables={{ ...queryVariables }}>
              {({ error, loading, data }) => {
                if (error) return <p>Something Went Wrong...</p>;
                if (loading) return <Loader />;

                let perks = [];

                data.perks.forEach(perk => {
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

                const count = perksConnectionData.data.perksConnection;

                return (
                  <Table
                    data={perks}
                    page={currentPage}
                    loading={loading}
                    count={count}
                    take={take}
                    turnPageHandler={turnPageHandler}
                    toolbar={
                      <Input
                        icon="search"
                        placeholder="Search..."
                        onChange={inputChangeHandler}
                      />
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
