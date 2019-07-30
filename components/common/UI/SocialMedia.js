import React, { useState } from "react";

import Title from "./Title";
import { Button, Icon } from "semantic-ui-react";

const socialMedia = () => {
  const url =
    "http://myexactjobsstaging.herokuapp.com/jobs/view/Surgeon-5d3630364b307c00178569a3";
  // SWITCH TO THIS WHEN DEPLOYING
  // const url = location.window.href;

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=Look%20at%20this%20amazing%20opportunity!%20${url}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;

  return (
    <div className={"SocialMedia"}>
      <Title size="s">Share this Job:</Title>

      <div className={"buttons"}>
        <a target="_blank">
          <button
            className="ui twitter button"
            onClick={() =>
              window.open(
                { twitterUrl },
                "Popup",
                "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=400, top=30"
              )
            }
          >
            <i aria-hidden="true" className="twitter icon"></i>
            Twitter
          </button>
        </a>

        <a
          href={facebookUrl}
          target="_blank"
          onClick={() =>
            window.open(
              { facebookUrl },
              "Popup",
              "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=400, top=30"
            )
          }
        >
          <button className="ui facebook button">
            <i aria-hidden="true" className="facebook icon"></i>
            Facebook
          </button>
        </a>

        <a
          href={linkedinUrl}
          target="_blank"
          onClick={() =>
            window.open(
              { linkedinUrl },
              "Popup",
              "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=400, top=30"
            )
          }
        >
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
