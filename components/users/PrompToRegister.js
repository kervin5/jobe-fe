import React, { useState } from "react";
import { Query } from "react-apollo";
import { ME_USER_QUERY } from "../../lib/auth";
import PopUp from "../common/UI/PopUp";
import AuthForm from "../users/AuthForm";

const PrompToRegister = props => {
  const [loggedin, setLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    if (!loggedin) {
      setShowPopup(true);
    }
  };

  return (
    <>
      <PopUp show={showPopup} title="Register" changeHandler={setShowPopup}>
        <p>Please register or login to use this and other amazing features</p>
        <AuthForm />
      </PopUp>
      <Query query={ME_USER_QUERY}>
        {({ error, loading, data }) => {
          if (error) return <p>Error...</p>;
          if (loading) return <p>Loading...</p>;
          if (data.me) setLoggedIn(true);
          return (
            <div
              className={"PromptToRegister " + (loggedin ? "" : "Nulled")}
              onClick={handleClick}
            >
              {props.children}

              <style jsx>{`
                .PromptToRegister {
                  display: inline-block;
                  background-color: red;
                }

                .Nulled {
                  pointer-events: "none";
                }
              `}</style>
            </div>
          );
        }}
      </Query>
    </>
  );
};

export default PrompToRegister;
