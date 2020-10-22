import { gql } from "@apollo/client";

export const APPLICATIONS_BY_USER_ID_QUERY = gql`
  query APPLICATIONS_BY_USER_ID_QUERY($id: String!) {
    applications(
      where: { user: { id: { equals: $id } } }
      orderBy: { createdAt: desc }
    ) {
      id
      createdAt
      status
      job {
        id
        title
        type
        description
        minCompensation
        maxCompensation
        location {
          id
          name
          latitude
          longitude
        }
        perks {
          id
          name
        }
        branch {
          id
          name
          description
          company {
            id
            name
            description
          }
        }
      }
    }
  }
`;

export const ALL_APPLICATIONS_QUERY = gql`
  query ALL_APPLICATIONS_QUERY(
    $take: Int
    $skip: Int
    $jobId: String
    $status: [ApplicationStatus!]
    $terms: String!
    $branch: String
  ) {
    applications(
      where: {
        job: { id: { equals: $jobId }, branchId: { equals: $branch } }
        status: { in: $status }
        OR: [
          {
            job: {
              OR: [
                { title: { contains: $terms } }
                { location: { name: { contains: $terms } } }
                { branch: { name: { contains: $terms } } }
              ]
            }
          }
          {
            user: {
              OR: [
                { name: { contains: $terms } }
                { email: { contains: $terms } }
              ]
            }
          }
        ]
      }
      take: $take
      skip: $skip
      orderBy: { createdAt: desc }
    ) {
      id
      createdAt
      status

      user {
        name

        id
        email
        phone
        location {
          name
        }
      }
      resume {
        title
        id
        file {
          path
          createdAt
          id
        }
      }

      job {
        id
        title
        location {
          id
          name
        }
        branch {
          id
          name
        }

        author {
          id
          name
          email
        }
      }
    }
  }
`;

export const USER_APPLICATION_CONNECTION_QUERY = gql`
  query USER_APPLICATION_CONNECTION_QUERY(
    $jobId: String
    $status: [ApplicationStatus!]
    $terms: String!
    $branch: String
  ) {
    applicationsConnection(
      where: {
        job: { id: { equals: $jobId }, branchId: { equals: $branch } }
        status: { in: $status }
        OR: [
          {
            job: {
              OR: [
                { title: { contains: $terms } }
                { location: { name: { contains: $terms } } }
                { branch: { name: { contains: $terms } } }
              ]
            }
          }
          {
            user: {
              OR: [
                { name: { contains: $terms } }
                { email: { contains: $terms } }
              ]
            }
          }
        ]
      }
    )
  }
`;
