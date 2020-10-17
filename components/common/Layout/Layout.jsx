import React, { useState } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import NavigationBar from "@/common/UI/Navigation/NavigationBar";
import BottomNav from "@/common/UI/Navigation/BottomNav";
import Footer from "./Footer";
import AdminSideMenu from "@/common/UI/Navigation/AdminSideMenu";
import variables from "@/common/globalVariables";
import { initGA, logPageView } from "@/lib/analytics";

Router.onRouteChangeStart = () => {
  NProgress.start();
  if (!window.GA_INITIALIZED) {
    initGA();
    window.GA_INITIALIZED = true;
  }
};
Router.onRouteChangeComplete = () => {
  logPageView();
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const layout = (props) => {
  const [adminBarIsOpen, setAdminBarIsOpen] = useState(false);
  return (
    <div className="Layout">
      {!props.hideNav && !props.admin && <NavigationBar />}
      {!props.hideNav && props.admin && (
        <NavigationBar
          leftHamburgerClickHandler={() => {
            setAdminBarIsOpen(!adminBarIsOpen);
          }}
        />
      )}
      {props.admin && !props.hideNav && <AdminSideMenu open={adminBarIsOpen} />}
      <main>{props.children}</main>
      <Footer />
      <BottomNav />
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: "Roboto", sans-serif;
        }

        .Layout {
          min-height: 100%;
          width: 100%;
          overflow-x: hidden;
          background-color: ${variables.mutedColor1};
        }

        p {
          line-height: 2em;
        }

        main {
          min-height: 100vh;
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

        @media (max-width: 900px) {
          .Layout {
            margin-bottom: ${variables.bottomNav};
          }
        }

        ul,
        ol {
          padding-left: 50px;
        }

        .modals.dimmer .ui.scrolling.modal {
          top: 86px;
        }
      `}</style>
    </div>
  );
};

export default layout;
