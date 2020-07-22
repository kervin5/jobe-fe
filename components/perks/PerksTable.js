import React, { useState } from "react";
import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";
import { Input } from "semantic-ui-react";
import { take } from "@/root/config";
import Router from "next/router";
import TableGraphql from "@/common/UI/Tables/TableGraphQL";
import Table from "@/common/UI/Tables/Table";
import PerksActionButtons from "./PerksActionButtons";
import Button from "@/common/UI/Button";
import appText from "@/lang/appText";
import {
  ALL_PERKS_QUERY,
  PERKS_CONNECTION_QUERY,
} from "@/graphql/queries/perks";
// import Button from "@/common/UI/Button";

const PerksTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const turnPageHandler = (pageNumber) => {
    setCurrentPage(parseInt(pageNumber));
  };

  const inputChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <TableGraphql
      dataQuery={ALL_PERKS_QUERY}
      countQuery={PERKS_CONNECTION_QUERY}
      rowFormat={(perk, queries) => ({
        name: perk.name,

        status: perk.status,
        jobs: perk.jobs?.length,
        actions: <PerksActionButtons perk={perk} refetchQueries={queries} />,
      })}
    />
  );

  return (
    <>
      <Query query={PERKS_CONNECTION_QUERY} ssr={false} variables={{ query }}>
        {(perksConnectionData) => {
          if (perksConnectionData.error) return <p>Something went wrong ...</p>;
          const queryVariables = {
            take,
            skip: (currentPage - 1) * take,
            query,
          };
          return (
            <Query query={ALL_PERKS_QUERY} variables={{ ...queryVariables }}>
              {({ error, loading, data }) => {
                if (error) return <p>Something Went Wrong...</p>;

                let perks = [];

                data?.perks.forEach((perk) => {
                  return perks.push({
                    name: perk.name,

                    status: perk.status,
                    jobs: perk.jobs?.length,
                    actions: (
                      <PerksActionButtons
                        perk={perk}
                        refetchQueries={[
                          {
                            query: ALL_PERKS_QUERY,
                            variables: { ...queryVariables },
                          },
                          {
                            query: PERKS_CONNECTION_QUERY,
                            variables: { query },
                          },
                        ]}
                      />
                    ),
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
                          placeholder={appText.actions.search}
                          onChange={inputChangeHandler}
                        />
                        {/* <Button onClick={() => Router.push("/admin/users/new")}>
                          Add Perk
                        </Button> */}
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
