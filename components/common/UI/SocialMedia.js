import React from "react";

import Title from "./Title";

const socialMedia = props => {
  const url = props.url;
  let newUrl = url.replace(" ", "-");

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
                  newUrl,

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
              "https://www.facebook.com/sharer/sharer.php?u=" + newUrl,
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
              "https://www.linkedin.com/shareArticle?mini=true&url=" + newUrl,
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

        <a
          href={
            "mailto:?subject=My Exact Jobs Career Opportunity&body=Look at this amazing Job Opportunity! " +
            newUrl
          }
        >
          <button className="ui labeled icon button">
            <i className="envelope icon"></i>
            Email
          </button>
        </a>
      </div>
    </div>
  );
};

export default socialMedia;
