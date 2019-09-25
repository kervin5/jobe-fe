import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { perPage } from "../../config";

import Table from "../common/UI/Table";
import Loader from "../common/UI/Animated/Loader";
import Button from "../common/UI/Button";

const CANDIDATE_QUERY = gql`
  query CANDIDATE_QUERY($perPage: Int!, $skip: Int!) {
    users(first: $perPage, skip: $skip) {
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
  query USERS_CONNECTION_QUERY {
    usersConnection {
      aggregate {
        count
      }
    }
  }
`;

const Candidates = props => {
  const [currentPage, setCurrentPage] = useState(1);

  const turnPageHandler = pageNumber => {
    setCurrentPage(parseInt(pageNumber));
  };

  return (
    <Query query={USERS_CONNECTION_QUERY} ssr={false}>
      {userConnectionData => {
        if (userConnectionData.error) return <p>Something went wrong ...</p>;
        if (userConnectionData.loading) return <Loader />;

        return (
          <Query
            query={CANDIDATE_QUERY}
            variables={{
              perPage,
              skip: (currentPage - 1) * perPage,
              jobId: "" || props.jobId
            }}
          >
            {({ error, loading, data }) => {
              if (error) return <p>Something Went Wrong...</p>;
              if (loading) return <Loader />;
              let candidates = [];

              data.users.forEach(user => {
                let resume = user.resumes;
                console.log(resume);

                candidates.push({
                  name: user.name,
                  email: <a href={`malito:${user.email}`}>{user.email}</a>,
                  title: user.resumes.title,
                  resume: (
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        window.open(user.resumes.file.path);
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
  );
};

export default Candidates;
