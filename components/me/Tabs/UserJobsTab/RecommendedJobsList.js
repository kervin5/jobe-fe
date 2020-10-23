import React, { useState, useEffect } from "react";
import { Query } from "@apollo/react-components";
import Jobs from "@/components/jobs/JobList/JobsListQuery";
import Title from "@/common/UI/Title";
import UserLocator from "@/root/data/UserLocator";
import { USER_CATEGORIES_QUERY } from "@/components/me/UserCategories";
import UserInfo from "@/components/hoc/UserInfo";
import appText from "@/lang/appText";

const RecommendedJobsList = ({ userId }) => {
  const [location, setLocation] = useState(undefined);

  useEffect(() => {
    new UserLocator().getLocation().then((res) => {
      setLocation(res.name);
    });
  }, []);

  return (
    <>
      <Title level={3}>{appText.messages.job.recommended}</Title>
      <UserInfo>
        {({ me, loading }) => {
          if (loading) return <p>Loading</p>;
          return (
            <Query
              query={USER_CATEGORIES_QUERY}
              variables={{ userId: userId ?? me.id }}
            >
              {({ error, loading, data }) => {
                if (me && location)
                  return (
                    <Jobs
                      {...(data && data.categories.length
                        ? { category: getRandom(data.categories).name }
                        : {})}
                      location={location}
                    />
                  );
                return null;
              }}
            </Query>
          );
        }}
      </UserInfo>
    </>
  );
};

function getRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
export default RecommendedJobsList;
