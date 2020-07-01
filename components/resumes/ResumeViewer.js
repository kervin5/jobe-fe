import React from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/react-components";
import WordViewer from "./WordViewer";

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

          if (
            data.getSignedFileUrl.includes(".doc") ||
            data.getSignedFileUrl.includes(".docx")
          ) {
            return <WordViewer url={data.getSignedFileUrl} />;
          }
          return (
            <>
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
              {/* <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${data.getSignedFileUrl}`} width='1366px' height='623px' >This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe> */}
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default ResumeViewer;
