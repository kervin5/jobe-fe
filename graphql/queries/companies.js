import { gql } from "@apollo/client";

export const ALL_COMPANIES_QUERY = gql`
  query ALL_COMPANIES_QUERY(
    $where: CompanyWhereInput
    $take: Int
    $skip: Int = 0
  ) {
    companies(where: $where, skip: $skip, take: $take) {
      id
      name
      branches {
        id
      }
    }
  }
`;

export const ALL_COMPANIES_COUNT = gql`
  query ALL_COMPANIES_COUNT($where: CompanyWhereInput) {
    companiesCount(where: $where)
  }
`;

export const SINGLE_COMPANY_QUERY = gql`
  {
    companies {
      id
      name
    }
  }
`;
