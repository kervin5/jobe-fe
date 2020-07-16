import React, { useState } from "react";
import { Query } from "@apollo/react-components";
import Button from "./Button";
import PopUp from "./PopUp";
import AuthForm from "@/components/users/AuthForm";
import ResumeUploadForm from "../../resumes/ResumeUploadForm";
import { CHECK_USER_APPLICATION_STATUS_QUERY } from "./ApplyToJobButton";
import { ME_USER_QUERY } from "@/graphql/queries/users";
import appText from "@/lang/appText";

const RegisterToApplyButton = (props) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState("Register");
  const [caption, setCaption] = useState(
    appText.messages.application.beforeApplying
  );

  return (
    <>
      <Query query={ME_USER_QUERY}>
        {({ error, loading, data }) => {
          if (error) return <p>Something went wrong</p>;
          if (loading) return <p>Loading</p>;
          if (data.me && data.me.role.name !== "candidate") return null;
          return (
            <div>
              <Button fullWidth onClick={() => setShowPopUp(true)}>
                {appText.messages.application.applyNow} 😀
              </Button>
            </div>
          );
        }}
      </Query>

      <PopUp show={showPopUp} changeHandler={setShowPopUp} title={popUpTitle}>
        <p>{caption} 😊</p>
        <Query query={ME_USER_QUERY}>
          {({ error, loading, data }) => {
            if (error) return <p>Something went wrong...</p>;
            if (loading) return <p>Loading...</p>;
            if (data.me && data.me.resumes.length === 0) {
              setPopUpTitle(appText.messages.resume.upload);
              setCaption(appText.messages.resume.justOneMoreStep);
              return (
                <ResumeUploadForm
                  noredirect
                  refetchQueries={[
                    {
                      query: CHECK_USER_APPLICATION_STATUS_QUERY,
                      variables: { jobId: props.jobId },
                    },
                  ]}
                />
              );
            }
            return (
              <AuthForm
                noredirect
                refetchQueries={[{ query: ME_USER_QUERY }]}
              />
            );
          }}
        </Query>
      </PopUp>
    </>
  );
};

export default RegisterToApplyButton;
