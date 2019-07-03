import React, { useState } from "react";
import Head from "../../head.js";
import NavigationBar from "../UI/Navigation/NavigationBar";
import NavigationDrawer from "../UI/Navigation/NavigationDrawer";

const layout = props => {
  const [showDrawer, setShowDrawer] = useState(false);
  console.log(showDrawer);
  const handleMenuClick = value => setShowDrawer(!showDrawer);

  return (
    <div className="Layout">
      <Head title={props.title} />
      {props.hideNav ? null : (
        <NavigationBar menuButtonClick={handleMenuClick} />
      )}
      {<NavigationDrawer show={showDrawer} toggle={handleMenuClick} />}
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
