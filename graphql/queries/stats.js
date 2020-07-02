import { gql } from "@apollo/client";

export const STATS_APPLICATIONS_COUNT_BY_BRANCH = gql`
  {
    statsApplicationsByBranch {
      name
      count
      status
    }
  }
`;

export const STATS_JOBS_COUNT_BY_BRANCH = gql`
  {
    statsJobsByBranch {
      name
      count
      status
    }
  }
`;

export const STATS_YTD_JOB_APPLICATIONS_COUNT = gql`
  {
    statsYTDJobsAndApplications {
      count
      count2
      label
    }
  }
`;

export const STATS_POWER_USERS = gql`
  {
    statsPowerUsers {
      count
      label2
      label
    }
  }
`;
