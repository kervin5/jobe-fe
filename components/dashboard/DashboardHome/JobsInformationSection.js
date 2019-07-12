import React from "react";
import Table from "../../common/UI/Table";
import axios from "../../../data/api";
import CounterCard from "../../common/UI/CounterCard";

class JobsInformationSection extends React.Component {
  state = {
    jobs: [],
    jobsCount: {
      draft: 0,
      posted: 0
    }
  };

  componentDidMount() {
    axios({
      url: "/jobs/user",
      method: "get",
      headers: {
        Authorization: window.sessionStorage.getItem("token")
      }
    })
      .then(response => {
        this.setState({ jobs: response.data });
      })
      .catch(err => {
        console.log(err);
      });

    axios({
      url: "/jobs/count",
      method: "get",
      headers: {
        Authorization: window.sessionStorage.getItem("token")
      }
    })
      .then(response => {
        this.setState({ jobsCount: response.data.jobsCount });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="Summary">
          <CounterCard label="Posted" value={this.state.jobsCount.posted} />
          <CounterCard
            label="Draft"
            value={this.state.jobsCount.draft}
            color="2"
            icon="Create"
          />
          <CounterCard
            label="Expired"
            value={this.state.jobsCount.draft}
            color="3"
            icon="TimerOff"
          />
          <CounterCard
            label="Applications"
            value={this.state.jobsCount.draft}
            color="4"
            icon="Face"
          />
        </div>
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
        <style jsx>{`
          .Summary {
            display: flex;
            margin-bottom: 20px;
            margin-top: 20px;
            justify-content: space-between;
            flex-wrap: wrap;
          }

          .Summary > * {
            min-width: 600px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default JobsInformationSection;
