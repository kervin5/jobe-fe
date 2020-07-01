import React, { useState } from "react";
import { Query } from "@apollo/react-components";
import { ME_USER_QUERY } from "@/graphql/queries/users";
import PopUp from "@/common/UI/PopUp";
import AuthForm from "../users/AuthForm";

const PrompToRegister = props => {
  const [loggedin, setLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = e => {
    if (!loggedin) {
      e.preventDefault();
      e.stopPropagation();
      setShowPopup(true);
    }
  };

  return (
    <>
      <PopUp show={showPopup} title="Register" changeHandler={setShowPopup}>
        <p>Please register or login to use this and other amazing features</p>
        <AuthForm popup />
      </PopUp>
      <Query query={ME_USER_QUERY}>
        {({ error, loading, data }) => {
          if (error) return <p>Error...</p>;
          if (loading) return <p>Loading...</p>;
          if (data.me) setLoggedIn(true);
          return (
            <div className={"PromptToRegister"} onClickCapture={handleClick}>
              {props.children}

              <style jsx>{`
                .PromptToRegister {
                  display: inline-block;
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
