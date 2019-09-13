import { useState, useEffect } from "react";
import { Input, Menu, Segment } from "semantic-ui-react";
import Icon from "../common/UI/Icon";
import JobList from "../jobs/JobList/JobList";
import ResumeList from "../common/UI/ResumeList";
import Button from "../common/UI/Button";
import Upload from "../../pages/resumes/upload";

import { Query } from "react-apollo";
import gql from "graphql-tag";
import Title from "../common/UI/Title";

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
          createdAt
          location {
            name
          }
        }
      }
    }
  }
`;

const RESUME_LIST_QUERY = gql`
  query RESUME_LIST_QUERY {
    me {
      id
      name
      resumes {
        id
        title
        file {
          id
          path
          createdAt
          updatedAt
        }
      }
    }
  }
`;

const userJobList = () => {
  const [jobsTorender, setJobsToRender] = useState([]);
  const [activeItem, setActiveItem] = useState("recommended");
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const addResume = () => {
    <Upload />;
  };

  return (
    <div className="UserJobList">
      <Menu attached="top" tabular className={"hide"}>
        <Menu.Item
          name="recommended"
          active={activeItem === "recommended"}
          onClick={handleItemClick}
        >
          <Icon icon="video camera" />
          <span>&nbsp; Recommended</span>
        </Menu.Item>
        <Menu.Item
          name="favorites"
          active={activeItem === "favorites"}
          onClick={handleItemClick}
        >
          <Icon icon="star" />
          <span>&nbsp; Favorites</span>
        </Menu.Item>
        <Menu.Item
          name="applied"
          active={activeItem === "applied"}
          onClick={handleItemClick}
        >
          <Icon icon="check" />
          <span>&nbsp; Applied</span>
        </Menu.Item>
        <Menu.Item
          name="resumes"
          active={activeItem === "resumes"}
          onClick={handleItemClick}
        >
          <Icon icon="file alternate outline" />
          <span>&nbsp; Resumes</span>
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
          <>
            <Title size="s">These are your Reccommended Jobs.</Title>
            <Query query={USER_RECOMMENDED_JOBS}>
              {({ error, loading, data }) => {
                if (error) return <p>Something went wrong</p>;
                if (loading) return <p>Loading Awesome Jobs</p>;

                return <JobList jobs={formatJobs(data)} />;
              }}
            </Query>
          </>
        )}
        {activeItem === "favorites" && (
          <>
            <Title size="s">These are your Favorited Jobs.</Title>
            <Query query={USER_FAVORITED_JOBS}>
              {({ error, loading, data }) => {
                if (error) return <p>Something went wrong</p>;
                if (loading) return <p>Loading Awesome Jobs</p>;
                if (!data.me) return <p>Please wait</p>;
                return <JobList jobs={formatJobs(data)} />;
              }}
            </Query>
          </>
        )}
        {activeItem === "applied" && (
          <>
            <Title size="s">You have applied to these Jobs.</Title>
            <Query query={USER_APPLIED_JOBS}>
              {({ error, loading, data }) => {
                if (error) return <p>Something went wrong</p>;
                if (loading) return <p>Loading Awesome Jobs</p>;
                return <JobList jobs={formatJobs(data)} />;
              }}
            </Query>
          </>
        )}
        {activeItem === "resumes" && (
          <>
            <div className="resumeHeader">
              <Title size="s">These are your resumes.</Title>
              <Button click={addResume}> Add New</Button>
            </div>
            <Query query={RESUME_LIST_QUERY}>
              {({ error, loading, data }) => {
                if (error) return <p>There was an error</p>;
                if (loading) return <p>Loading your resumes</p>;
                let list = data.me.resumes;

                return <ResumeList list={list} />;
              }}
            </Query>
          </>
        )}
      </Segment>

      <style jsx>{`
        .resumeHeader {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        @media (max-width: 550px) {
          .UserJobList :global(.menu .item:not(.active) > *:not(.Icon)) {
            display: none;
          }
        }
      `}</style>
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
