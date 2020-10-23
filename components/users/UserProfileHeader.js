import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import UserLocator from "../../data/UserLocator";
import UserCategories from "../me/UserCategories";
import Card from "@/common/UI/Card";
import Avatar from "@/common/UI/Avatar";
import { ME_USER_QUERY } from "@/graphql/queries/users";
import { SINGLE_USER_QUERY } from "@/graphql/queries/users";
import Title from "@/common/UI/Title";
import appText from "@/lang/appText";

const StyledUserProfileHeader = styled.div`
  &.UserProfileHeader {
    margin-bottom: 30px;
  }
  .UserInformation {
    width: 100%;
    display: flex;
    padding: 20px;
  }

  .Avatar {
    display: flex;
  }

  .MainContent {
    width: 100%;
  }

  .UserName {
    margin-bottom: 0;
  }

  .MembershipDate {
    text-transform: capitalize;
  }
  @media (max-width: 600px) {
    .UserInformation {
      flex-direction: column;
      align-items: center !important;
    }

    .MainContent {
      text-align: center;

      .Title {
        text-align: center;
      }
    }
  }
`;

const UserProfileHeader = ({ userId }) => {
  const [userLocation, setUserLocation] = useState("");
  const userQuery = queryToUse(userId);
  const { error, loading, data } = useQuery(userQuery.query, {
    variables: userQuery.variables,
  });

  useEffect(() => {
    if (!userId) {
      new UserLocator().getLocation().then((res) => {
        setUserLocation(res.name);
      });
    }
  }, []);

  const userData = data?.me ?? data?.user;

  return (
    <StyledUserProfileHeader className="UserProfileHeader">
      <Card withBackground>
        <div className="UserInformation">
          <div className="Avatar">
            <Avatar name={userData?.name} />
          </div>

          <div className="MainContent">
            <div className="ProfileTitle">
              <h1 className="UserName">{userData ? userData.name : ""}</h1>

              <span className="MembershipDate">
                {appText.objects.member.singular} {appText.prepositions.since}{" "}
                {data && new Date(userData.createdAt).getFullYear()}
              </span>
            </div>

            <Title level={5} color="1">
              {appText.messages.category.favorite}
            </Title>
            {data && (
              <UserCategories userId={userData.id} location={userLocation} />
            )}
            <p>
              <strong>{userData?.location?.name ?? userLocation}</strong>
            </p>
          </div>
          <div></div>
        </div>
      </Card>
    </StyledUserProfileHeader>
  );
};

function queryToUse(userId) {
  if (userId) {
    return { query: SINGLE_USER_QUERY, variables: { id: userId } };
  } else {
    return { query: ME_USER_QUERY, variables: {} };
  }
}

export default UserProfileHeader;
