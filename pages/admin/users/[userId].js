import React, { useState } from "react";
import { useRouter } from "next/router";
import UserProfile from "@/components/users/UserProfile/UserProfile";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import appText from "@/lang/appText";

const UserPage = () => {
  const { query } = useRouter();

  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "USER", action: "CREATE" }]}
    >
      <DashboardPage title={appText.objects.user.singular}>
        {query.userId && <UserProfile userId={query.userId} />}
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default UserPage;
