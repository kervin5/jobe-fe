import React, { useState, useEffect } from "react";
import UserLocator from "../../data/UserLocator";
import { Query } from "react-apollo";
import { Item } from "semantic-ui-react";
import UserCategories from "./UserCategories";
import Card from "../common/UI/Card";
import Avatar from "../common/UI/Avatar";
import { ME_USER_QUERY } from "../../lib/auth";
import Title from "../common/UI/Title";

const UserInfo = () => {
  const [userLocation, setUserLocation] = useState("Loading");

  useEffect(() => {
    new UserLocator().getLocation().then(res => {
      setUserLocation(res.name);
    });
  }, []);

  return (
    <div className="UserInfo">
      <Card withBackground>
        <Query query={ME_USER_QUERY}>
          {({ error, loading, data }) => {
            return (
              <>
                <Item.Group divided>
                  <Item>
                    <Item.Content>
                      <Item.Header>{data ? data.me.name : ""}</Item.Header>
                      <Item.Meta>
                        <span className="cinema">
                          Member since{" "}
                          {data && new Date(data.me.createdAt).getFullYear()}
                        </span>
                      </Item.Meta>
                      <Item.Description>
                        <strong>{userLocation}</strong>
                      </Item.Description>
                      <Item.Extra>
                        <Title size="xs" color="1">
                          Favorite categories:
                        </Title>
                        {data && (
                          <UserCategories
                            userId={data.me.id}
                            location={userLocation}
                          />
                        )}
                      </Item.Extra>
                    </Item.Content>
                    <span className="Avatar">
                      <Avatar />
                    </span>
                  </Item>
                </Item.Group>
              </>
            );
          }}
        </Query>
      </Card>

      <style jsx>{`
        .UserInfo {
          margin-bottom: 30px;
        }

        .Avatar {
          position: absolute;
          right: 0;
          top: 10px;
        }
      `}</style>
    </div>
  );
};

export default UserInfo;
