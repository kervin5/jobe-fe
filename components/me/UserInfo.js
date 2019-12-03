import React, { useState, useEffect } from "react";
import UserLocator from "../../data/UserLocator";
import { Query } from "react-apollo";
import { Button, Icon, Image, Item, Label } from "semantic-ui-react";
import Card from "../common/UI/Card";
import Avatar from "../common/UI/Avatar";
import { ME_USER_QUERY } from "../../lib/auth";

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
                    <Avatar />

                    <Item.Content>
                      <Item.Header>{data ? data.me.name : ""}</Item.Header>
                      <Item.Meta>
                        <span className="cinema">Member since 2019</span>
                      </Item.Meta>
                      <Item.Description>{userLocation}</Item.Description>
                      <Item.Extra>
                        <Label>IMAX</Label>
                        <Label icon="globe" content="Additional Languages" />
                      </Item.Extra>
                    </Item.Content>
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
      `}</style>
    </div>
  );
};

export default UserInfo;
