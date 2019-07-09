import React from "react";

import variables from "../globalVariables";

const socialMedia = () => {
  return (
    <div className={"SocialMediaContainer"}>
      <h4>Twitter</h4>
      <style jsx>{`
                .SocialMediaContainer {
                    background-color: orange;
                    border-radius: ${variables.roundedRadius}
                    padding:500px;
                }
            `}</style>
    </div>
  );
};

export default socialMedia;
