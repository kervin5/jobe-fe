import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Table from "../../common/UI/Table";
import { Grid } from "semantic-ui-react";
import CounterCard from "../../common/UI/CounterCard";
import Loader from "../../common/UI/Animated/Loader";
import { perPage } from "../../../config";

const USER_JOBS_QUERY = gql`
  query USER_JOBS_QUERY($perPage: Int!, $skip: Int!) {
    me {
      id
      jobs(first: $perPage, skip: $skip) {
        id
        title
        location {
          name
        }
        status
      }
    }
  }
`;

const USER_JOBS_CONNECTION_QUERY = gql`
  query USER_JOBS_CONNECTION_QUERY {
    jobsConnectionPerUser {
      aggregate {
        count
      }
    }
  }
`;

class JobsInformationSection extends React.Component {
  state = {
    jobsCount: {
      draft: 0,
      posted: 0
    },

    currentJobsPage: 1
  };

  handleTurnPage = pageNumber => {
    this.setState({ currentJobsPage: parseInt(pageNumber) });
  };

  render() {
    return (
      <React.Fragment>
        <Query
          query={USER_JOBS_QUERY}
          variables={{
            perPage,
            skip: (this.state.currentJobsPage - 1) * perPage
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <Loader />;
            if (error) return <p>Something went wrong</p>;
            return (
              <React.Fragment>
                <div className="Summary">
                  <Grid columns={4}>
                    <Grid.Column>
                      <CounterCard
                        label="Posted"
                        value={this.state.jobsCount.posted}
                      />
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
                <Query query={USER_JOBS_CONNECTION_QUERY}>
                  {queryResult => {
                    if (queryResult.loading) return <p>Loading...</p>;
                    if (queryResult.error) return <p>Something Failed...</p>;
                    return (
                      <Table
                        page={this.state.currentJobsPage}
                        count={
                          queryResult.data.jobsConnectionPerUser.aggregate.count
                        }
                        perPage={perPage}
                        turnPageHandler={this.handleTurnPage}
                        data={data.me.jobs.map(job => {
                          return {
                            ...job,
                            location: job.location.name
                          };
                        })}
                      />
                    );
                  }}
                </Query>
              </React.Fragment>
            );
          }}
        </Query>
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
