import React, { useState } from "react";
import Button from "./Button";
import PopUp from "./PopUp";
import RegisterForm from "../../users/RegisterForm";

const RegisterToApplyButton = () => {
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <>
      <div>
        <Button fullWidth click={() => setShowPopUp(true)}>
          {" "}
          Apply Now 😀
        </Button>
      </div>
      <PopUp show={showPopUp} changeHandler={setShowPopUp}>
        <p>
          Before applying for this position you need to register with us. It
          will only take a few minutes 😊
        </p>
        <RegisterForm onSubmit={() => console.log("Applied")} />
      </PopUp>
    </>
  );
};

export default RegisterToApplyButton;
