import React from "react";
import Head from "../../head.js";
import NavigationBar from "../UI/Navigation/NavigationBar";

const layout = props => {
  return (
    <div className="Layout">
      <Head title={props.title} />
      {props.hideNav ? null : <NavigationBar />}
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
        }

        p {
          line-height: 1.6em;
        }

        main {
          height: 100%;
        }

        button:focus {
          outline: 0;
        }
      `}</style>
    </div>
  );
};

export default layout;
