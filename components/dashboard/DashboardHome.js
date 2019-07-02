import React from "react";
import Table from "../common/UI/Table";
import axios from "../../data/api";

class DashboardHome extends React.Component {
  state = {
    jobs: []
  };

  componentDidMount() {
    axios({
      url: "/jobs/user/all",
      method: "get",
      headers: {
        Authorization: window.sessionStorage.getItem("token")
      }
    })
      .then(response => {
        console.log(response);
        this.setState({ jobs: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Table
        title="Jobs"
        columns={[
          { title: "Title", field: "title" },
          { title: "Location", field: "location" },
          { title: "Posted", field: "posted", type: "date" },
          {
            title: "Category",
            field: "category"
          }
        ]}
        data={this.state.jobs}
      />
    );
  }
}

export default DashboardHome;
