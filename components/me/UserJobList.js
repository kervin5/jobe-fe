import { useState, useEffect } from "react";
import { Input, Menu, Segment } from "semantic-ui-react";
import Icon from "../common/UI/Icon";
import JobList from "../jobs/JobList/JobList";
import { getAuthToken } from "../../data/auth";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const USER_RECOMMENDED_JOBS = gql`
  query USER_RECOMMENDED_JOBS {
    jobs(first: 10) {
      id
      title
      description
      createdAt
      location {
        name
      }
      minCompensation
      maxCompensation
      type
    }
  }
`;

const USER_FAVORITED_JOBS = gql`
  query USER_FAVORITED_JOBS {
    me {
      name
      id
      favorites {
        id
        job {
          id
          title
          description
          minCompensation
          maxCompensation
          type
          qualifications
          requirements
          createdAt
          location {
            name
          }
        }
      }
    }
  }
`;

const USER_APPLIED_JOBS = gql`
  query USER_APPLIED_JOBS {
    me {
      name
      id
      applications {
        id
        job {
          id
          title
          description
          minCompensation
          maxCompensation
          type
          qualifications
          requirements
          createdAt
          location {
            name
          }
        }
      }
    }
  }
`;

const userJobList = () => {
  const [jobsTorender, setJobsToRender] = useState([]);
  const [activeItem, setActiveItem] = useState("recommended");
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div>
      <div>
        <h5>
          Based on your skills, here is what we think would be a great choice
          for you
        </h5>
        <Menu attached="top" tabular>
          <Menu.Item
            name="recommended"
            active={activeItem === "recommended"}
            onClick={handleItemClick}
          >
            <Icon icon="video camera" />
            &nbsp; Recommended
          </Menu.Item>
          <Menu.Item
            name="favorites"
            active={activeItem === "favorites"}
            onClick={handleItemClick}
          >
            <Icon icon="star" />
            &nbsp; Favorites
          </Menu.Item>
          <Menu.Item
            name="applied"
            active={activeItem === "applied"}
            onClick={handleItemClick}
          >
            <Icon icon="check" />
            &nbsp; Applied
          </Menu.Item>
          <Menu.Item
            name="resumes"
            active={activeItem === "resumes"}
            onClick={handleItemClick}
          >
            <Icon icon="file alternate outline" />
            &nbsp; Resumes
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Input
                transparent
                icon={{ name: "search", link: true }}
                placeholder="Search jobs..."
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Segment attached="bottom">
          {activeItem === "recommended" && (
            <Query query={USER_RECOMMENDED_JOBS} ssr={true}>
              {({ error, loading, data }) => {
                if (error) return <p>Something went wrong</p>;
                if (loading) return <p>Loading Awesome Jobs</p>;

                return <JobList jobs={formatJobs(data)} />;
              }}
            </Query>
          )}
          {activeItem === "favorites" && (
            <Query query={USER_FAVORITED_JOBS} ssr={true}>
              {({ error, loading, data }) => {
                if (error) return <p>Something went wrong</p>;
                if (loading) return <p>Loading Awesome Jobs</p>;

                return <JobList jobs={formatJobs(data)} />;
              }}
            </Query>
          )}
          {activeItem === "applied" && (
            <Query query={USER_APPLIED_JOBS} ssr={true}>
              {({ error, loading, data }) => {
                if (error) return <p>Something went wrong</p>;
                if (loading) return <p>Loading Awesome Jobs</p>;

                return <JobList jobs={formatJobs(data)} />;
              }}
            </Query>
          )}
        </Segment>
      </div>
    </div>
  );
};

const formatJobs = data => {
  let jobs = [];

  if (data.me) {
    if (data.me.favorites) {
      jobs = jobs.concat(data.me.favorites.map(favorite => favorite.job));
    } else if (data.me.applications) {
      jobs = data.me.applications.map(application => application.job);
    } else {
      jobs = [];
    }
  } else {
    jobs = jobs.concat(data.jobs);
  }
  return jobs;
};

export default userJobList;
