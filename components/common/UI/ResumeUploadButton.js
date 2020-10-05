import React, { useState } from "react";
import { Query } from "@apollo/react-components";
import Button from "./Button";
import PopUp from "./PopUp";
import ResumeUploadForm from "@/components/resumes/ResumeUploadForm";
import { ME_USER_QUERY } from "@/graphql/queries/users";
import appText from "@/lang/appText";

const RegisterToApplyButton = (props) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState("Add a new Resume");

  return (
    <>
      <Query query={ME_USER_QUERY}>
        {({ error, loading, data }) => {
          if (error) return <p>Something went wrong</p>;
          if (loading) return <p>Loading</p>;
          if (data.me);
          return (
            <div>
              <Button fullWidth onClick={() => setShowPopUp(true)}>
                {appText.actions.upload} {appText.adjectives.new}
              </Button>
            </div>
          );
        }}
      </Query>

      <PopUp show={showPopUp} changeHandler={setShowPopUp} title={popUpTitle}>
        <p>{appText.messages.resume.upload}😊</p>
        <Query query={ME_USER_QUERY}>
          {({ error, loading, data }) => {
            if (error) return <p>Something went wrong...</p>;
            if (loading) return <p>Loading...</p>;
            if (data.me) {
              return (
                <ResumeUploadForm
                  noredirect
                  refetchQueries={[
                    {
                      query: ME_USER_QUERY,
                    },
                  ]}
                />
              );
            }
          }}
        </Query>
      </PopUp>
    </>
  );
};

export default RegisterToApplyButton;
