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

      @media only screen and (max-width: 520px) {
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 0px;
      }
    `}</style>
  </div>
);

export default JobListingContentBlock;
