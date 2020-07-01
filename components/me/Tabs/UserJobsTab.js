import React from "react";
import RecommendedJobsList from "./UserJobsTab/RecommendedJobsList";

const UserJobsTab = ({ userId }) => {
  return (
    <div>
      <RecommendedJobsList userId={userId} />
    </div>
  );
};

export default UserJobsTab;
