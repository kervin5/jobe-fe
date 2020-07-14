import React, { useState } from "react";
import Link from "next/link";
import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";
import { Button, Input, Label } from "semantic-ui-react";
import { take } from "../../config";
import appText from "@/lang/appText";
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
      applications {
        id
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

const Candidates = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [skills, setSkills] = useState([]);

  const turnPageHandler = (pageNumber) => {
    setCurrentPage(parseInt(pageNumber));
  };

  const inputChangeHandler = (e) => {
    setCurrentPage(1);
    setQuery(e.target.value);
  };

  return (
    <Query
      query={CANDIDATES_CONNECTION_QUERY}
      ssr={false}
      variables={{ query, ...(skills.length ? { skills } : {}) }}
    >
      {(userConnectionData) => {
        if (userConnectionData.error) return <p>Something went wrong ...</p>;

        return (
          <Query
            query={CANDIDATE_QUERY}
            variables={{
              take,
              skip: (currentPage - 1) * take,
              jobId: "" || props.jobId,
              query,
              ...(skills.length ? { skills } : {}),
            }}
          >
            {({ error, loading, data }) => {
              if (error) return <p>Something Went Wrong...</p>;

              let candidates = [];

              data?.candidates.forEach((candidate) => {
                const hasResume = candidate.resumes.length > 0;
                const resumeSkills = candidate.resumes[0].skills.slice(0, 5);

                return candidates.push({
                  name: candidate.name,
                  email: (
                    <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                  ),
                  title: hasResume ? (
                    candidate.resumes[0].title
                  ) : (
                    <p>{appText.messages.resume.doesntHave}</p>
                  ),
                  applications: candidate.applications?.length,
                  skills: resumeSkills.map((skill) => (
                    <Label
                      content={skill.name}
                      color="blue"
                      key={`SkillTag${skill.name + new Date()}`}
                    />
                  )),
                  eEmpact: <EempactStatusLabel data={candidate.eEmpact} />,
                  resume: hasResume && (
                    <Button
                      color="green"
                      onClick={(e) => {
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
                  actions: (
                    <Link
                      href="/admin/candidates/[cid]"
                      as={`/admin/candidates/${candidate.id}`}
                      passHref
                    >
                      <Button
                        as="a"
                        icon="eye"
                        color={"green"}
                        href={`/admin/candidates/${candidate.id}`}
                      />
                    </Link>
                  ),
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
                        placeholder={appText.actions.search}
                        onChange={inputChangeHandler}
                      />
                      <DropdownGraphqlInput
                        onChange={(e, data) => {
                          setSkills(data.value);
                          setCurrentPage(1);
                        }}
                        name="jobSkills"
                        placeholder={
                          appText.actions.filterBy +
                          " " +
                          appText.objects.skill.plural
                        }
                        multiple
                        nolabel
                        minWidth={"150px"}
                        graphql={{
                          query: `query ALL_SKILLS( $query: String! ) { skills(where: {name: {contains: $query}} orderBy: {name: asc}) { id name } }`,
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
