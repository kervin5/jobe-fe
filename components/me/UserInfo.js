import React from "react";
import Title from "../common/UI/Title";
import { Query } from "react-apollo";
import Card from "../common/UI/Card";
import Avatar from "../users/Avatar";
import { ME_USER_QUERY } from "../../lib/auth";

const UserInfo = () => {
  return (
    <div className="UserInfo">
      <Card withBackground>
        <Query query={ME_USER_QUERY}>
          {({ error, loading, data }) => {
            console.log(data);
            return (
              <>
                <Avatar />
                <Title>{data ? data.me.name : ""}</Title>
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
