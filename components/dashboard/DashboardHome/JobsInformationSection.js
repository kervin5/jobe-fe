import React from "react";
import { Grid } from "semantic-ui-react";
import CounterCard from "../../common/UI/CounterCard";
import JobsTable from "../../jobs/JobsTable";

class JobsInformationSection extends React.Component {
  state = {
    jobsCount: {
      draft: 0,
      posted: 0
    }
  };

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
        <JobsTable />

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
