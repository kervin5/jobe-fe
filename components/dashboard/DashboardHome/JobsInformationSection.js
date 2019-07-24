import React from "react";
import Table from "../../common/UI/Table";
import { Grid } from "semantic-ui-react";
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
          <Grid columns={4}>
            <Grid.Column>
              <CounterCard label="Posted" value={this.state.jobsCount.posted} />
            </Grid.Column>
            <Grid.Column>
              <CounterCard
                label="Draft"
                value={this.state.jobsCount.draft}
                color="2"
                icon="pencil"
              />
            </Grid.Column>
            <Grid.Column>
              <CounterCard
                label="Expired"
                value={this.state.jobsCount.draft}
                color="3"
                icon="clock"
              />
            </Grid.Column>
            <Grid.Column>
              <CounterCard
                label="Applicants"
                value={this.state.jobsCount.draft}
                color="4"
                icon="smile"
              />
            </Grid.Column>
          </Grid>
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
