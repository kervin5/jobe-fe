import React from "react";
import { useQuery } from "@apollo/client";
import Tabs from "@/common/UI/Tabs";
import { SINGLE_USER_QUERY } from "@/graphql/queries/users";
import UserProfileHeader from "./UserProfileHeader";
import styled from "styled-components";
import appText from "@/lang/appText";
import BranchessAccessPanel from "@/components/access/branches/BranchesAccessPanel";

const StyledUserProfile = styled.div``;

const panes = (userData) => {
  const selected = [];

  if (userData) {
    if (userData.branch) {
      selected.push({ ...userData.branch, primary: true });
    }

    userData.otherBranches.map((otherBranch) =>
      selected.push({ ...otherBranch, primary: false })
    );
  }

  return [
    {
      label: appText.objects.activity.singular,
      content: () => <p>Tab 1 Content</p>,
    },
    {
      label: appText.objects.branch.plural,
      content: () => (
        <div>
          <BranchessAccessPanel selected={selected} userId={userData?.id} />
        </div>
      ),
    },
  ];
};

const UserProfile = ({ userId }) => {
  const { error, loading, data } = useQuery(SINGLE_USER_QUERY, {
    variables: { id: userId },
  });

  return (
    <StyledUserProfile>
      <UserProfileHeader userData={data?.user} />
      <Tabs tabs={panes(data?.user)} />
    </StyledUserProfile>
  );
};

export default UserProfile;
