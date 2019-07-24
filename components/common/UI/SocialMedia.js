import React, { useState } from "react";

import Title from "./Title";
import { Button, Icon } from "semantic-ui-react";

const socialMedia = () => {
  const [shareOpen, setShareOpen] = useState("closeShare");
  // const [ toggleButtonText, setToggleButtonText ] = useState("Share This");

  // shareOpenToggle =  shareOpenToggle.bind(shareOpen);

  const shareOpenToggle = () => {
    if (!shareOpen) {
      setShareOpen("openShare");
    } else {
      setShareOpen("closeShare");
    }
  };

  const url =
    "https://myexactjobsstaging.herokuapp.com/jobs/view/Warehouse-5d1f8075273e520017323c43";

  // CHANGE TO:
  // const url = location.window.href;

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const TwitterUrl = `https://twitter.com/intent/tweet?text=Look%20at%20this%20amazing%20opportunity!%20${url}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;

  return (
    <div className={"SocialMedia"}>
      <Title size="s">Share this Job:</Title>

      <div className={"buttons"}>
        <a href={TwitterUrl} target="_blank">
          <button className="ui twitter button">
            <i aria-hidden="true" className="twitter icon"></i>
            Twitter
          </button>
        </a>

        <a href={facebookUrl} target="_blank">
          <button className="ui facebook button">
            <i aria-hidden="true" className="facebook icon"></i>
            Facebook
          </button>
        </a>

        <a href={linkedinUrl} target="_blank">
          <button className="ui linkedin button">
            <i aria-hidden="true" className="linkedin icon"></i>
            LinkedIn
          </button>
        </a>
      </div>
    </div>
  );
};

export default socialMedia;
