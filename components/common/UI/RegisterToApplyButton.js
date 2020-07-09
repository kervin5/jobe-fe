import React, { useState } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/react-components";
import Button from "./Button";
import PopUp from "./PopUp";
import AuthForm from "@/components/users/AuthForm";
import ResumeUploadForm from "../../resumes/ResumeUploadForm";
import { CHECK_USER_APPLICATION_STATUS_QUERY } from "./ApplyToJobButton";
import { ME_USER_QUERY } from "@/graphql/queries/users";

const RegisterToApplyButton = (props) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState("Register");
  const [caption, setCaption] = useState(
    "Before applying for this job you need to create a profile. It will only take a few minutes"
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
                Apply Now 😀
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
              setPopUpTitle("Upload Resume");
              setCaption(
                "Just one more step. Please upload your most recent resume"
              );
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
