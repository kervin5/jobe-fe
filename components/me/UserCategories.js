import React from "react";
import { Label, Loader } from "semantic-ui-react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/react-components";
import Link from "next/link";

// skills(where: { job: { application: { user: {id: $userId} } } }) {
//     id
//     name
// }

export const USER_CATEGORIES_QUERY = gql`
  query USER_CATEGORIES_QUERY($userId: String!) {
    categories(
      take: 12
      where: {
        OR: [
          {
            jobs: {
              some: {
                applications: { some: { user: { id: { equals: $userId } } } }
              }
            }
          }
          {
            jobs: {
              some: {
                favorites: { some: { user: { id: { equals: $userId } } } }
              }
            }
          }
        ]
      }
    ) {
      id
      name
    }
  }
`;
const UserCategories = ({ userId, location }) => {
  return (
    <Query query={USER_CATEGORIES_QUERY} variables={{ userId }}>
      {({ error, loading, data }) => {
        if (loading) return <Loader />;

        return data.categories.map((category, index) => (
          <Link
            key={"categoryLabel" + index + category.name}
            href={`/jobs?category=${category.name}&location=${location}`}
          >
            <Label
              as="a"
              href={`/jobs?category=${category.name}&location=${location}`}
            >
              {category.name}
            </Label>
          </Link>
        ));
        //   return(<> <Label>IMAX</Label>
        //     <Label icon="globe" content="Additional Languages" /></>);
      }}
    </Query>
  );
};

export default UserCategories;
