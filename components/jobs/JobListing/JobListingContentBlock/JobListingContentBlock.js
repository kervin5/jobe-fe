import React from "react";

import Title from "../../../common/UI/Title";

const JobListingContentBlock = props => (
  <div>
    <Title size={"m"}>{props.title}</Title>
    <p>{props.children}</p>
    <style jsx>{`
      p {
        padding-bottom: 40px;
      }
    `}</style>
  </div>
);

export default JobListingContentBlock;
