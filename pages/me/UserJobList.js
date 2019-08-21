import { useState, useEffect } from "react";
import { Input, Menu, Segment } from "semantic-ui-react";
import Icon from "../../components/common/UI/Icon";
import JobList from "../../components/jobs/JobList/JobList";
import { getAuthToken } from "../../data/auth";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const USER_JOBLIST_QUERY = gql`
  query USER_JOBLIST_QUERY {
    jobs {
      id
      title
      description
      createdAt
      minCompensation
      maxCompensation
      compensationType
      type
      location {
        name
      }
    }
  }
`;

const userJobList = () => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobsTorender, setJobsToRender] = useState([]);

  const [activeItem, setActiveItem] = useState("recommended");
  const handleItemClick = (e, { name }) => setActiveItem(name);

  useEffect(() => {
    switch (activeItem) {
      case "favorites":
        fetchJobs("/jobs", favoriteJobs, setFavoriteJobs);
        break;
      case "applied":
        fetchJobs("/jobs/user/applied", appliedJobs, setAppliedJobs);
        break;
      default:
        fetchJobs("/jobs", recommendedJobs, setRecommendedJobs);
    }
  }, [activeItem, recommendedJobs, favoriteJobs, appliedJobs]);

  //fetchJobs  received from fetchJobs^^^

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
          <Query query={USER_JOBLIST_QUERY}>
            {({ error, loading, data }) => {
              if (error) return <p>Something went wrong</p>;
              if (loading) return <p>Loading Awesome Jobs</p>;
              console.log(data);
              return <JobList jobs={data.jobs} />;
            }}
          </Query>
        </Segment>
      </div>
    </div>
  );
};

export default userJobList;
/**
 *
 */

// const UserJobList = () => {
//   const [recommendedJobs, setRecommendeJobs] = useState([]);
//   const [favoriteJobs, setFavoriteJobs] = useState([]);
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [jobsTorender, setJobsToRender] = useState([]);

//   const [activeItem, setActiveItem] = useState("recommended");
//   const handleItemClick = (e, { name }) => setActiveItem(name);

//   useEffect(() => {
//     if (recommendedJobs.length === 0) {
//       axios
//         .get("/jobs")
//         .then(res => {
//           console.log(res);
//           setRecommendeJobs(res.data);
//         })
//         .catch(err => console.log(err));
//     }
//   }, []);

//   useEffect(() => {
//     switch (activeItem) {
//       case "favorites":
//         fetchJobs("/jobs", favoriteJobs, setFavoriteJobs);
//         break;
//       case "applied":
//         fetchJobs("/jobs/user/applied", appliedJobs, setAppliedJobs);
//         break;
//       default:
//         fetchJobs("/jobs", recommendedJobs, setRecommendeJobs);
//     }
//   }, [activeItem]);

//   useEffect(() => {
//     switch (activeItem) {
//       case "favorites":
//         setJobsToRender(favoriteJobs);
//         break;
//       case "applied":
//         setJobsToRender(appliedJobs);
//         break;
//       default:
//         setJobsToRender(recommendedJobs);
//     }
//   }, [activeItem, recommendedJobs, favoriteJobs, appliedJobs]);

// const fetchJobs = (route, currentItems, handler) => {
//   if (currentItems.length === 0) {
//     axios(route, {
//       headers: {
//         Authorization: getAuthToken()
//       }
//     })
//       .then(res => {
//         handler(res.data);
//       })
//       .catch(err => console.log(err));
//   }
// };

//   return (
// <div>
//   <h5>
//     Based on your skills, here is what we think would be a great choice for
//     you
//   </h5>
//    <Menu attached="top" tabular>
// <Menu.Item
//       name="recommended"
//       active={activeItem === "recommended"}
//       onClick={handleItemClick}
//     >
//       <Icon icon="video camera" />
//       &nbsp; Recommended
//     </Menu.Item>
//     <Menu.Item
//       name="favorites"
//       active={activeItem === "favorites"}
//       onClick={handleItemClick}
//     >
//       <Icon icon="star" />
//       &nbsp; Favorites
//     </Menu.Item>
//     <Menu.Item
//       name="applied"
//       active={activeItem === "applied"}
//       onClick={handleItemClick}
//     >
//       <Icon icon="check" />
//       &nbsp; Applied
//     </Menu.Item>
//     <Menu.Menu position="right">
//       <Menu.Item>
//         <Input
//           transparent
//           icon={{ name: "search", link: true }}
//           placeholder="Search jobs..."
//         />
//       </Menu.Item>
//     </Menu.Menu>
//   </Menu>
//   <Segment attached="bottom">
//     <JobList jobs={jobsTorender} />
//   </Segment>
// </div>
//   );
// };
// export default UserJobList;

/////////////////////////////////////////////////////
