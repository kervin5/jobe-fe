import React from "react";
import { useQuery } from "@apollo/client";
import { Tab } from "semantic-ui-react";
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
      menuItem: appText.objects.activity.singular,
      render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
    },
    {
      menuItem: appText.objects.branch.plural,
      render: () => (
        <Tab.Pane>
          <BranchessAccessPanel selected={selected} />
        </Tab.Pane>
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
      <Tab panes={panes(data?.user)} />
    </StyledUserProfile>
  );
};

export default UserProfile;
