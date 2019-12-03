import { useState } from "react";
import PopUpContext from "../common/UI/PopUp/PopUpContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import React from "react";

const AuthForm = props => {
  const [componentInView, setComponentInView] = useState("register");
  const toggleView = () =>
    setComponentInView(componentInView === "register" ? "login" : "register");

  const options = {
    register: {
      link: (
        <p>
          Already have an account?{" "}
          <DynamicLink onClick={toggleView} title="Sign In">
            Click here
          </DynamicLink>{" "}
          to sign in.
        </p>
      )
    },
    login: {
      link: (
        <p>
          Do you need an account?{" "}
          <DynamicLink onClick={toggleView} title="Register">
            Click here
          </DynamicLink>{" "}
          to register.
        </p>
      )
    }
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

const DynamicLink = props => (
  <PopUpContext.Consumer>
    {context => {
      return (
        <a
          onClick={e => {
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
