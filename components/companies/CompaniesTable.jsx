import React from "react";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import TableGraphql from "@/common/UI/Tables/TableGraphqlWithQuery";
import appText from "@/lang/appText";

import {
  ALL_COMPANIES_QUERY,
  ALL_COMPANIES_COUNT,
} from "@/graphql/queries/companies";

const CompaniesTable = (props) => {
  return (
    <TableGraphql
      dataQuery={ALL_COMPANIES_QUERY}
      countQuery={ALL_COMPANIES_COUNT}
      rowFormat={(record) => ({
        name: record.name,
        branches: record.branches.length,
      })}
      toolbar={
        <Button onClick={() => Router.push("/admin/companies/new")}>
          {appText.actions.new} {appText.objects.company.singular}
        </Button>
      }
      searchFilter={(value) => ({ where: { name: { contains: value } } })}
    />
  );
};

export default CompaniesTable;
// };
