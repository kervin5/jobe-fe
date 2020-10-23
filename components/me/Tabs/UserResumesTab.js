import React from "react";
import { useQuery } from "@apollo/client";
import Title from "@/common/UI/Title";
import ResumeUploadButton from "@/common/UI/ResumeUploadButton";
import ResumeList from "@/common/UI/ResumeList";
import { ME_USER_QUERY, SINGLE_USER_QUERY } from "@/graphql/queries/users";
import appText from "@/lang/appText";

const UserResumesTab = ({ userId }) => {
  const userQuery = queryToUse(userId);
  const { error, loading, data } = useQuery(userQuery.query, {
    variables: userQuery.variables,
  });
  const userData = data?.me ?? data?.user;
  let list = userData?.resumes;

  return (
    <>
      <div className="resumeHeader">
        <Title center level={4}>
          {appText.messages.resume.theseAre(userData.name, data.me)}
        </Title>
        {!userId && <ResumeUploadButton />}
      </div>
      {error && <p>There was an error</p>}
      {loading && <p>Loading your resumes</p>}
      {list && <ResumeList list={list} />}
    </>
  );
};

function queryToUse(userId) {
  if (userId) {
    return { query: SINGLE_USER_QUERY, variables: { id: userId } };
  } else {
    return { query: ME_USER_QUERY, variables: {} };
  }
}

export default UserResumesTab;
