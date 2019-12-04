import React from "react";
import { Label, Loader } from "semantic-ui-react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Link from "next/link";

// skills(where: { job: { application: { user: {id: $userId} } } }) {
//     id
//     name
// }

const USER_CATEGORIES_QUERY = gql`
  query USER_CATEGORIES_QUERY($userId: ID!) {
    categories(
      first: 12
      where: {
        OR: [
          { jobs_some: { applications_some: { user: { id: $userId } } } }
          { jobs_some: { favorites_some: { user: { id: $userId } } } }
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
