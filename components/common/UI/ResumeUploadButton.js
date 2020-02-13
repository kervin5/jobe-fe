import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Button from "./Button";
import PopUp from "./PopUp";
import AuthForm from "../../users/AuthForm";
import ResumeUploadForm from "../../resumes/ResumeUploadForm";
import { RESUME_LIST_QUERY } from "../../me/UserProfileTabs";

const USER_IS_REGISTERED_QUERY = gql`
  query USER_IS_REGISTERED_QUERY {
    me {
      id
      resumes {
        id
      }
      role {
        id
        name
      }
    }
  }
`;

const RegisterToApplyButton = props => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState("Add a new Resume");

  return (
    <>
      <Query query={USER_IS_REGISTERED_QUERY}>
        {({ error, loading, data }) => {
          if (error) return <p>Something went wrong</p>;
          if (loading) return <p>Loading</p>;
          if (data.me);
          return (
            <div>
              <Button fullWidth onClick={() => setShowPopUp(true)}>
                Upload New
              </Button>
            </div>
          );
        }}
      </Query>

      <PopUp show={showPopUp} changeHandler={setShowPopUp} title={popUpTitle}>
        <p>Upload a New Resume😊</p>
        <Query query={USER_IS_REGISTERED_QUERY}>
          {({ error, loading, data }) => {
            if (error) return <p>Something went wrong...</p>;
            if (loading) return <p>Loading...</p>;
            if (data.me) {
              return (
                <ResumeUploadForm
                  noredirect
                  refetchQueries={[
                    {
                      query: RESUME_LIST_QUERY
                    }
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
