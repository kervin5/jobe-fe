import { useState, useEffect } from "react";
import axios from "../../data/api";
import { Input, Menu, Segment } from "semantic-ui-react";
import Icon from "../../components/common/UI/Icon";
import JobList from "../../components/jobs/JobList/JobList";
import { getAuthToken } from "../../data/auth";

/**
 *
 */

const UserJobList = () => {
  const [recommendedJobs, setRecommendeJobs] = useState([]);
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobsTorender, setJobsToRender] = useState([]);

  const [activeItem, setActiveItem] = useState("recommended");
  const handleItemClick = (e, { name }) => setActiveItem(name);

  useEffect(() => {
    if (recommendedJobs.length === 0) {
      axios
        .get("/jobs")
        .then(res => {
          console.log(res);
          setRecommendeJobs(res.data);
        })
        .catch(err => console.log(err));
    }
  }, []);

  useEffect(() => {
    switch (activeItem) {
      case "favorites":
        fetchJobs("/jobs", favoriteJobs, setFavoriteJobs);
        break;
      case "applied":
        fetchJobs("/jobs/user/applied", appliedJobs, setAppliedJobs);
        break;
      default:
        fetchJobs("/jobs", recommendedJobs, setRecommendeJobs);
    }
  }, [activeItem]);

  useEffect(() => {
    switch (activeItem) {
      case "favorites":
        setJobsToRender(favoriteJobs);
        break;
      case "applied":
        setJobsToRender(appliedJobs);
        break;
      default:
        setJobsToRender(recommendedJobs);
    }
  }, [activeItem, recommendedJobs, favoriteJobs, appliedJobs]);

  const fetchJobs = (route, currentItems, handler) => {
    if (currentItems.length === 0) {
      axios(route, {
        headers: {
          Authorization: getAuthToken()
        }
      })
        .then(res => {
          handler(res.data);
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
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
        <JobList jobs={jobsTorender} />
      </Segment>
    </div>
  );
};
export default UserJobList;
