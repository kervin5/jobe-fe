import React from "react";

import Loader from "@/common/UI/Animated/Loader";
import Chip from "@material-ui/core/Chip";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
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
  const { error, loading, data } = useQuery(USER_CATEGORIES_QUERY, {
    variables: { userId },
  });

  if (loading) return <Loader />;

  return data.categories.map((category, index) => (
    <Link
      key={"categoryLabel" + index + category.name}
      href={`/jobs?category=${category.name}&location=${location}`}
    >
      <Chip
        as="a"
        href={`/jobs?category=${category.name}&location=${location}`}
        label={category.name}
      />
    </Link>
  ));
};

export default UserCategories;
