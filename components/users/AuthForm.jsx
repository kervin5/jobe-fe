import { useState } from "react";
import PopUpContext from "@/common/UI/PopUp/PopUpContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import React from "react";
import appText from "@/lang/appText";

const AuthForm = (props) => {
  const [componentInView, setComponentInView] = useState("register");
  const toggleView = () =>
    setComponentInView(componentInView === "register" ? "login" : "register");

  const options = {
    register: {
      link: (
        <p>
          {appText.messages.account.alreadyhave}
          <DynamicLink onClick={toggleView} title={appText.actions.login}>
            {appText.actions.login}
          </DynamicLink>{" "}
        </p>
      ),
    },
    login: {
      link: (
        <p>
          {appText.messages.account.donthave}
          <DynamicLink onClick={toggleView} title={appText.actions.register}>
            {appText.actions.register}
          </DynamicLink>{" "}
        </p>
      ),
    },
  };
  const ComponentToRender =
    componentInView === "register" ? RegisterForm : LoginForm;

  return (
    <>
      <ComponentToRender {...props} />
      {options[componentInView].link}
    </>
  );
};

const DynamicLink = (props) => (
  <PopUpContext.Consumer>
    {(context) => {
      return (
        <a
          onClick={(e) => {
            e.preventDefault();
            props.onClick();
            context.setTitle(props.title);
          }}
        >
          {props.children}
        </a>
      );
    }}
  </PopUpContext.Consumer>
);

export default AuthForm;
