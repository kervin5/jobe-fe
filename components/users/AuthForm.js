import { useState, useContext } from "react";
import PopUpContext from "../common/UI/PopUp/PopUpContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import React from "react";

const AuthForm = props => {
  const [componentInView, setComponentInView] = useState("register");
  const toggleView = () =>
    setComponentInView(componentInView === "register" ? "login" : "register");
  const popup = useContext(PopUpContext);
  console.log(popup.setTitle("Kervin"));
  console.log(popup.title);
  const options = {
    register: {
      link: (
        <p>
          Already have an account?{" "}
          <DynamicLink onClick={toggleView}>Click here</DynamicLink> to sign in.
        </p>
      )
    },
    login: {
      link: (
        <p>
          Do you need an account?{" "}
          <DynamicLink onClick={toggleView}>Click here</DynamicLink> to
          register.
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
  <a
    onClick={e => {
      e.preventDefault();
      props.onClick();
    }}
  >
    {props.children}
  </a>
);

export default AuthForm;
