import React, { useState, useEffect } from "react";
import UserLocator from "../../data/UserLocator";
import { Query } from "react-apollo";
import UserCategories from "./UserCategories";
import Card from "@/common/UI/Card";
import Avatar from "@/common/UI/Avatar";
import { ME_USER_QUERY } from "@/lib/auth";
import Title from "@/common/UI/Title";

const UserProfileHeader = () => {
  const [userLocation, setUserLocation] = useState("Loading");

  useEffect(() => {
    new UserLocator().getLocation().then(res => {
      setUserLocation(res.name);
    });
  }, []);

  return (
    <div className="UserProfileHeader">
      <Card withBackground>
        <Query query={ME_USER_QUERY}>
          {({ error, loading, data }) => {
            return (
              <>
                <div className="UserInformation">
                  <div className="Avatar">
                    <Avatar name={data ? data.me.name : undefined} />
                  </div>

                  <div className="MainContent">
                    <div className="ProfileTitle">
                      <h1 className="UserName">{data ? data.me.name : ""}</h1>

                      <span className="cinema">
                        Member since{" "}
                        {data && new Date(data.me.createdAt).getFullYear()}
                      </span>
                    </div>

                    <Title size="xs" color="1">
                      Favorite categories
                    </Title>
                    {data && (
                      <UserCategories
                        userId={data.me.id}
                        location={userLocation}
                      />
                    )}
                    <strong>{userLocation}</strong>
                  </div>
                  <div></div>
                </div>
              </>
            );
          }}
        </Query>
      </Card>

      <style jsx>{`
        .UserProfileHeader {
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

        @media (max-width: 600px) {
          .UserInformation {
            flex-direction: column;
            align-items: center !important;
          }

          .MainContent {
            text-align: center;
          }

          .MainContent :global(.Title) {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default UserProfileHeader;
