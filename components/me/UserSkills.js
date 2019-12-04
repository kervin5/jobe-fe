import React from "react";
import { Label, Loader } from "semantic-ui-react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

// skills(where: { job: { application: { user: {id: $userId} } } }) {
//     id
//     name
// }

const USER_SKILLS_QUERY = gql`
  query USER_SKILLS_QUERY($userId: ID!) {
    skills(
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
const UserSkills = ({ userId }) => {
  return (
    <Query query={USER_SKILLS_QUERY} variables={{ userId }}>
      {({ error, loading, data }) => {
        if (loading) return <Loader />;

        return data.skills.map((skill, index) => (
          <Label key={"SkillLabel" + index + skill.name}>{skill.name}</Label>
        ));
        //   return(<> <Label>IMAX</Label>
        //     <Label icon="globe" content="Additional Languages" /></>);
      }}
    </Query>
  );
};

export default UserSkills;
