import React from "react";

const WordViewer = ({ url }) => {
  return (
    <div className="WordViewer">
      <iframe
        src={`https://docs.google.com/gview?url=${encodeURIComponent(
          url
        )}&embedded=true`}
      ></iframe>
      {/* <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`} width='1366px' height='623px' frameBorder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe> */}
      <style jsx>
        {`
          .WordViewer {
            width: 100%;
          }

          .WordViewer iframe {
            width: 100%;
            min-height: calc(100vh - 90px);
          }
        `}
      </style>
    </div>
  );
};

export default WordViewer;
