import React from "react";
import styled from "styled-components";
import UserProfileHeader from "@/components/users/UserProfileHeader";
import UserProfileTabs from "@/components/me/UserProfileTabs";

const StyledCandidateProfile = styled.div``;

const CandidateProfile = ({ userId }) => {
  return (
    <StyledCandidateProfile className="CandidateProfile">
      <UserProfileHeader userId={userId} />
      <UserProfileTabs userId={userId} />
    </StyledCandidateProfile>
  );
};

export default CandidateProfile;
