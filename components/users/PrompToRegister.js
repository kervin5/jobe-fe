import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME_USER_QUERY } from "@/graphql/queries/users";
import PopUp from "@/common/UI/PopUp";
import AuthForm from "../users/AuthForm";
import appText from "@/lang/appText";
import styled from "styled-components";

const StyledPromptToRegister = styled.div`
  display: inline-block;
  & > * {
    pointer-events: none;
  }

  &:hover {
    cursor: pointer;
  }
`;

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
    if (data?.me) {
      setLoggedIn(true);
    }
  }, [data, loading]);

  if (error) return <p>Error...</p>;

  return (
    <>
      <PopUp show={showPopup} title="Register" changeHandler={setShowPopup}>
        <p>{appText.messages.account.pleaseRegister}</p>
        <AuthForm popup />
      </PopUp>

      <StyledPromptToRegister
        className={"PromptToRegister"}
        onClickCapture={handleClick}
      >
        {props.children}
      </StyledPromptToRegister>
    </>
  );
};

export default PrompToRegister;
