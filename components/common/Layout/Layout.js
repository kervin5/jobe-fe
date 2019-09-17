import React, { useState } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import NavigationBar from "../UI/Navigation/NavigationBar";
// import NavigationDrawer from "../UI/Navigation/NavigationDrawer";
import variables from "../globalVariables";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const layout = props => {
  const [showDrawer, setShowDrawer] = useState(false);
  const handleMenuClick = value => setShowDrawer(!showDrawer);

  return (
    <div className="Layout">
      {props.hideNav ? null : (
        <NavigationBar menuButtonClick={handleMenuClick} />
      )}
      <main>{props.children}</main>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: "Lato", sans-serif;
        }

        .Layout {
          min-height: 100%;
          width: 100%;
          overflow-x: hidden;
          background-color: ${variables.mutedColor1};
        }

        p {
          line-height: 1.6em;
        }

        main {
          height: 100%;
          margin-top: 55px;
        }

        @media (max-width: 720px) {
          main {
            margin-top: 48px;
          }
        }

        button:focus {
          outline: 0;
        }

        fieldset {
          border: none;
        }

        /* Make clicks pass-through */
        #nprogress {
          pointer-events: none;
        }

        #nprogress .bar {
          background: ${variables.accentColor1};
          position: fixed;
          z-index: 2031;
          top: 0;
          left: 0;

          width: 100%;
          height: 5px;
        }

        /* Fancy blur effect */
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${variables.accentColor1},
            0 0 5px ${variables.accentColor1};
          opacity: 1;

          -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
        }

        /* Remove these to get rid of the spinner */
        #nprogress .spinner {
          display: block;
          position: fixed;
          z-index: 1031;
          bottom: 15px;
          left: 15px;
        }

        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;

          border: solid 2px transparent;
          border-top-color: ${variables.accentColor1};
          border-left-color: ${variables.accentColor1};
          border-radius: 50%;

          -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
        }

        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }

        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }

        @-webkit-keyframes nprogress-spinner {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes nprogress-spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default layout;
