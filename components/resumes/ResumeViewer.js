import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_SINGE_FILE_URL_QUERY = gql`
  query GET_SINGE_FILE_URL_QUERY($url: String!) {
    getSignedFileUrl(AWSUrl: $url)
  }
`;

const ResumeViewer = ({ url }) => {
  return (
    <div>
      <Query query={GET_SINGE_FILE_URL_QUERY} variables={{ url }}>
        {({ error, loading, data }) => {
          if (error) return <p>Something went wrong</p>;
          if (loading) return <p>Loading...</p>;
          return (
            <object data={data.getSignedFileUrl} type="application/pdf">
              <embed src={data.getSignedFileUrl} type="application/pdf" />
              <p>
                It appears you don't have a the proper plugin to load this in
                your browser. You can{" "}
                <a href={data.getSignedFileUrl}>
                  click here to access the resource.
                </a>
              </p>
              <style jsx>{`
                object {
                  width: 100%;
                  min-height: calc(100vh - 90px);
                }
              `}</style>
            </object>
          );
        }}
      </Query>
    </div>
  );
};

export default ResumeViewer;
