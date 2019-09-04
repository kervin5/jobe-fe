import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Button from "./Button";
import PopUp from "./PopUp";
import RegisterForm from "../../users/RegisterForm";
import ResumeUploadForm from "../../resumes/ResumeUploadForm";
import { CHECK_USER_APPLICATION_STATUS_QUERY } from "./ApplyToJobButton";

const USER_IS_REGISTERED_QUERY = gql`
  query USER_IS_REGISTERED_QUERY {
    me {
      id
      resumes {
        id
      }
    }
  }
`;

const RegisterToApplyButton = props => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState("Register");
  const [caption, setCaption] = useState(
    "Before applying for this position you need to register with us. It will only take a few minutes"
  );

  return (
    <>
      <div>
        <Button fullWidth click={() => setShowPopUp(true)}>
          Apply Now 😀
        </Button>
      </div>

      <PopUp show={showPopUp} changeHandler={setShowPopUp} title={popUpTitle}>
        <p>{caption} 😊</p>
        <Query query={USER_IS_REGISTERED_QUERY}>
          {({ error, loading, data }) => {
            if (error) return <p>Something went wrong...</p>;
            if (loading) return <p>Loading...</p>;
            if (data.me && data.me.resumes.length === 0) {
              setPopUpTitle("Resume");
              setCaption(
                "Just one more step. Please upload your most recent resume"
              );
              return (
                <ResumeUploadForm
                  noredirect
                  refetchQueries={[
                    {
                      query: CHECK_USER_APPLICATION_STATUS_QUERY,
                      variables: { jobId: props.jobId }
                    }
                  ]}
                />
              );
            }
            return (
              <RegisterForm
                noredirect
                refetchQueries={[{ query: USER_IS_REGISTERED_QUERY }]}
              />
            );
          }}
        </Query>
      </PopUp>
    </>
  );
};

export default RegisterToApplyButton;
