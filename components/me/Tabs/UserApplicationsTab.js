import React from "react";
import styled from "styled-components";
import ApplicationsList from "@/components/applications/ApplicationsList/ApplicationsList";

const UserApplicationsTab = ({ userId }) => {
  return <ApplicationsList userId={userId} />;
};

export default UserApplicationsTab;
