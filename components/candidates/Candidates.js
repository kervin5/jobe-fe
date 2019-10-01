import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Button, Input } from "semantic-ui-react";
import { perPage } from "../../config";

import Table from "../common/UI/Table";
import Loader from "../common/UI/Animated/Loader";
// import Button from "../common/UI/Button";

const CANDIDATE_QUERY = gql`
  query CANDIDATE_QUERY($perPage: Int!, $skip: Int!, $query: String!) {
    users(
      first: $perPage
      skip: $skip
      where: {
        role: { name: "CANDIDATE" }
        OR: [{ name_contains: $query }, { email_contains: $query }]
      }
    ) {
      id
      name
      email
      resumes(last: 1) {
        file {
          id
          path
        }
        id
        title
        createdAt
      }
    }
  }
`;

const USERS_CONNECTION_QUERY = gql`
  query USERS_CONNECTION_QUERY($query: String!) {
    usersConnection(
      where: {
        role: { name: "CANDIDATE" }
        OR: [{ name_contains: $query }, { email_contains: $query }]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const Candidates = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const turnPageHandler = pageNumber => {
    setCurrentPage(parseInt(pageNumber));
  };

  const inputChangeHandler = e => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Input
        icon="search"
        placeholder="Search..."
        onChange={inputChangeHandler}
      />
      <Query query={USERS_CONNECTION_QUERY} ssr={false} variables={{ query }}>
        {userConnectionData => {
          if (userConnectionData.error) return <p>Something went wrong ...</p>;
          if (userConnectionData.loading) return <Loader />;

          return (
            <Query
              query={CANDIDATE_QUERY}
              variables={{
                perPage,
                skip: (currentPage - 1) * perPage,
                jobId: "" || props.jobId,
                query
              }}
            >
              {({ error, loading, data }) => {
                if (error) return <p>Something Went Wrong...</p>;
                if (loading) return <Loader />;

                let candidates = [];

                data.users.forEach(user => {
                  const hasResume = user.resumes.length > 0;

                  return candidates.push({
                    name: user.name,
                    email: <a href={`malito:${user.email}`}>{user.email}</a>,
                    title: hasResume ? user.resumes[0].title : <p>No Resume</p>,
                    resume: hasResume && (
                      <Button
                        color="green"
                        onClick={e => {
                          e.preventDefault();
                          window.open(
                            "/resumes/" +
                              user.resumes[0].file.path.split("/").pop()
                          );
                        }}
                      >
                        Download Resume
                      </Button>
                    )
                  });
                });

                const count =
                  userConnectionData.data.usersConnection.aggregate.count;

                return (
                  <Table
                    data={candidates}
                    page={currentPage}
                    loading={loading}
                    count={count}
                    perPage={perPage}
                    turnPageHandler={turnPageHandler}
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

export default Candidates;

// let resume = () =>{
//   if (user.resumes.title.length === 0) {
//     return <p>No resume</p>
//   } else {
//     user.resumes.title
// };
// };
