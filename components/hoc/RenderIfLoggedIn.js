import React, { useState } from "react";
import Router from "next/router";
import { useQuery } from "@apollo/client";
import Loader from "@/common/UI/Animated/Loader";
import { userHasAccess } from "@/lib/auth";
import { ME_USER_QUERY } from "@/graphql/queries/users";

const RenderIfLoggedIn = ({ children, permissions, fallback, redirect }) => {
  const { error, loading, data } = useQuery(ME_USER_QUERY);

  if (error) return <p>Something went wrong</p>;
  if (loading) return <Loader active inline="centered" />;

  //When it's done loading
  if (!data.me && redirect) {
    Router.push("/user/login");
    return null;
  }

  //Show nothing is user is not authenticated
  if (!data.me) return null;

  if (permissions && !userHasAccess(permissions, data.me.role.permissions)) {
    if (typeof redirect === "string") {
      Router.push(redirect);
    }

    if (typeof redirect === "boolean") {
      Router.push("/user/login");
    }
    return fallback ? fallback : null;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default RenderIfLoggedIn;
