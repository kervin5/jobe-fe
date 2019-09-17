import React from "react";
import { Grid } from "semantic-ui-react";
import CounterCard from "../../common/UI/CounterCard";
import JobStatusCard from "./JobStatusCard";
import ApplicationStatusCard from "./ApplicationsStatusCard";
import JobsTable from "../../jobs/JobsTable";

class JobsInformationSection extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="Summary">
          <Grid columns={4}>
            <Grid.Column>
              <JobStatusCard label="Posted" status="POSTED" />
            </Grid.Column>
            <Grid.Column>
              <JobStatusCard
                label="Draft"
                status="DRAFT"
                icon="pencil"
                color="2"
              />
            </Grid.Column>
            <Grid.Column>
              <JobStatusCard
                label="Expired"
                status="EXPIRED"
                icon="clock"
                color="3"
              />
            </Grid.Column>
            <Grid.Column>
              <ApplicationStatusCard color="4" icon="smile" />
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
