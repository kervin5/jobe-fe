import React from "react";

import Title from "./Title";
import variables from "../globalVariables";

const socialMedia = props => {
  function fbshareCurrentPage() {
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=" +
        escape(window.location.href) +
        "&t=" +
        document.title,
      "",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
    );
    return false;
  }

  return (
    <div className={"SocialMedia"}>
      <Title size="s">Share this Job:</Title>
      <div className={"buttons"}>
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          className="twitter-share-button"
          data-size="large"
          data-text="What an opportunity!"
          data-hashtags="ExactStaff"
          data-show-count="true"
        >
          Share on Twitter
        </a>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        ></script>

        <a
          href="fbshareCurrentPage()"
          className="fb-share-button"
          data-size="large"
          data-layout="button"
        >
          Share on Facebook
        </a>
        <script
          async
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.3"
        ></script>
      </div>

      <style jsx>{`
        .SocialMedia {
          display: flex;
          flex-direction: column;
          align-items: baseline;
          padding: 10px;
        }

        .buttons {
          display: flex;
          align-content: space-between;
        }

        .buttons a {
          display: block;
          padding: 0 5px;
        }

        button {
          padding: 0 2px;
        }
      `}</style>
    </div>
  );
};

export default socialMedia;
