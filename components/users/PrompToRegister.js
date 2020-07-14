import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME_USER_QUERY } from "@/graphql/queries/users";
import PopUp from "@/common/UI/PopUp";
import AuthForm from "../users/AuthForm";
import appText from "@/lang/appText";

const PrompToRegister = (props) => {
  const [loggedin, setLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { error, loading, data } = useQuery(ME_USER_QUERY);

  const handleClick = (e) => {
    if (!loggedin || loading) {
      e.preventDefault();
      e.stopPropagation();
      setShowPopup(true);
    }
  };

  useEffect(() => {
    setLoggedIn(true);
  }, [data?.me]);

  if (error) return <p>Error...</p>;

  return (
    <>
      <PopUp show={showPopup} title="Register" changeHandler={setShowPopup}>
        <p>{appText.messages.account.pleaseRegister}</p>
        <AuthForm popup />
      </PopUp>

      <div className={"PromptToRegister"} onClickCapture={handleClick}>
        {props.children}

        <style jsx>{`
          .PromptToRegister {
            display: inline-block;
          }
        `}</style>
      </div>
    </>
  );
};

export default PrompToRegister;
