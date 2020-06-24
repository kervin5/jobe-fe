import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Button, Input, Label } from "semantic-ui-react";
import { take } from "../../config";

import EempactStatusLabel from "@/components/users/EempactStatusLabel";
import Table from "@/common/UI/Table";
import DropdownGraphqlInput from "@/common/UI/Input/CustomSemanticInput/DropdownGraphqlInput";

const CANDIDATE_QUERY = gql`
  query CANDIDATE_QUERY(
    $take: Int!
    $skip: Int!
    $query: String!
    $skills: [String!]
  ) {
    candidates(
      take: $take
      skip: $skip
      where: {
        OR: [{ name: { contains: $query } }, { email: { contains: $query } }]
        resumes: { some: { skills: { some: { id: { in: $skills } } } } }
      }
    ) {
      id
      name
      email
      eEmpact {
        id
        assignments
      }
      resumes(last: 1) {
        file {
          id
          path
        }
        id
        title
        createdAt
        skills {
          id
          name
        }
      }
    }
  }
`;

const CANDIDATES_CONNECTION_QUERY = gql`
  query CANDIDATES_CONNECTION_QUERY($query: String!, $skills: [String!]) {
    candidatesConnection(
      where: {
        OR: [{ name: { contains: $query } }, { email: { contains: $query } }]
        resumes: { some: { skills: { some: { id: { in: $skills } } } } }
      }
    )
  }
`;

const Candidates = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [skills, setSkills] = useState([]);

  const turnPageHandler = pageNumber => {
    setCurrentPage(parseInt(pageNumber));
  };

  const inputChangeHandler = e => {
    setCurrentPage(1);
    setQuery(e.target.value);
  };

  return (
    <Query
      query={CANDIDATES_CONNECTION_QUERY}
      ssr={false}
      variables={{ query, ...(skills.length ? { skills } : {}) }}
    >
      {userConnectionData => {
        if (userConnectionData.error) return <p>Something went wrong ...</p>;

        return (
          <Query
            query={CANDIDATE_QUERY}
            variables={{
              take,
              skip: (currentPage - 1) * take,
              jobId: "" || props.jobId,
              query,
              ...(skills.length ? { skills } : {})
            }}
          >
            {({ error, loading, data }) => {
              if (error) return <p>Something Went Wrong...</p>;

              let candidates = [];

              data?.candidates.forEach(candidate => {
                const hasResume = candidate.resumes.length > 0;

                return candidates.push({
                  name: candidate.name,
                  email: (
                    <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                  ),
                  title: hasResume ? (
                    candidate.resumes[0].title
                  ) : (
                    <p>No Resume</p>
                  ),
                  resume: hasResume && (
                    <Button
                      color="green"
                      onClick={e => {
                        e.preventDefault();
                        window.open(
                          "/resumes/" +
                            candidate.resumes[0].file.path.split("/").pop()
                        );
                      }}
                    >
                      Download Resume
                    </Button>
                  ),
                  skills:
                    !!skills.length &&
                    candidate.resumes[0].skills
                      .filter(skill => skills.includes(skill.id))
                      .map(skill => (
                        <Label content={skill.name} color="blue" />
                      )),
                  eEmpact: <EempactStatusLabel data={candidate.eEmpact} />
                });
              });

              const count = userConnectionData?.data?.candidatesConnection ?? 0;

              return (
                <Table
                  data={candidates}
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
                      <DropdownGraphqlInput
                        onChange={(e, data) => {
                          setSkills(data.value);
                          setCurrentPage(1);
                        }}
                        name="jobSkills"
                        placeholder="Filter by skills"
                        multiple
                        nolabel
                        graphql={{
                          query: `query ALL_SKILLS( $query: String! ) { skills(where: {name: {contains: $query}} orderBy: {name: asc}) { id name } }`
                        }}
                      />
                    </>
                  }
                />
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
};

export default Candidates;

// let resume = () =>{
//   if (user.resumes.title.length === 0) {
//     return <p>No resume</p>
//   } else {
//     user.resumes.title
// };
// };
