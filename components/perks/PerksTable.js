import React from "react";
import TableGraphql from "@/common/UI/Tables/TableGraphqlWithQuery";
import PerksActionButtons from "./PerksActionButtons";

import {
  ALL_PERKS_QUERY,
  PERKS_CONNECTION_QUERY,
} from "@/graphql/queries/perks";
// import Button from "@/common/UI/Button";

const PerksTable = (props) => {
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
};

export default PerksTable;
// };
