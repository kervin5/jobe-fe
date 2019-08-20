import React from "react";

import Title from "./Title";

const socialMedia = props => {
  const url = props.url;

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=Look%20at%20this%20amazing%20opportunity!%20${url}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;

  return (
    <div>
      <Title size="s">Share this Job:</Title>
      <div className={"buttons"}>
        <a target="_blank">
          <button
            className="ui twitter button"
            onClick={() =>
              window.open(
                "https://twitter.com/intent/tweet?text=Look%20at%20this%20amazing%20opportunity!%20" +
                  url,

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
          target="_blank"
          onClick={() =>
            window.open(
              "https://www.facebook.com/sharer/sharer.php?u=" + url,
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
          target="_blank"
          onClick={() =>
            window.open(
              "https://www.linkedin.com/shareArticle?mini=true&url=" + url,
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
