import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Title from "../../common/UI/Title";
import ResumeUploadButton from "../../common/UI/ResumeUploadButton";
import ResumeList from "../../common/UI/ResumeList";

export const RESUME_LIST_QUERY = gql`
  query RESUME_LIST_QUERY {
    me {
      id
      name
      resumes {
        id
        title
        file {
          id
          path
          createdAt
          updatedAt
        }
      }
    }
  }
`;

const UserResumesTab = () => {
  return (
    <>
      <div className="resumeHeader">
        <Title center size="s">
          These are your resumes.
        </Title>
        <ResumeUploadButton />
      </div>
      <Query query={RESUME_LIST_QUERY}>
        {({ error, loading, data }) => {
          if (error) return <p>There was an error</p>;
          if (loading) return <p>Loading your resumes</p>;
          let list = data.me.resumes;

          return <ResumeList list={list} />;
        }}
      </Query>
    </>
  );
};

export default UserResumesTab;
