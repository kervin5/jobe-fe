import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Mutation } from "@apollo/react-components";
import { gql } from "@apollo/client";
import variables from "@/common/globalVariables";
import Button from "@/common/UI/Button";
import ButtonGroup from "@/common/UI/ButtonGroup";
import { handleUpload } from "@/lib/upload";
import Router from "next/router";
import InputField from "@/common/UI/Input/InputField";
import appText from "@/lang/appText";

const SIGN_UPLOAD_MUTATION = gql`
  mutation SIGN_UPLOAD_MUTATION($fileName: String!, $fileType: String!) {
    signFileUpload(fileName: $fileName, fileType: $fileType) {
      signedRequest
      url
      acl
    }
  }
`;

const CREATE_RESUME_MUTATION = gql`
  mutation CREATE_RESUME_MUTATION(
    $path: String!
    $type: String!
    $title: String!
  ) {
    createResume(path: $path, type: $type, title: $title) {
      file {
        createdAt
      }
    }
  }
`;

const ResumeUploadForm = (props) => {
  const [fileToUpload, setFileToUpload] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [resumeTitle, setResumeTitle] = useState({ valid: false });

  const maxSize = 1048576;

  const onDrop = useCallback((acceptedFiles) => {
    setFileToUpload(acceptedFiles[0]);
  }, []);

  const uploadFile = async (signUploadMutation, createResumeMutation) => {
    //Requests signed url from backend to upload to AWS S3
    const result = await signUploadMutation();
    await setUploading(true);

    //Uses the signed URL to put file with axios to AWS S3
    const uploadRes = await handleUpload(
      result.data.signFileUpload.signedRequest,
      fileToUpload,
      fileToUpload.type,
      result.data.signFileUpload.acl,
      result.data.signFileUpload.url
    );
    await setUploading(false);

    //Creates record of uploaded file once the upload is completed
    createResumeMutation({
      variables: {
        path: uploadRes.path,
        type: uploadRes.fileType,
        title: resumeTitle.value,
      },
    });
    setUploaded(true);

    //Redirects the user to the me page after the upload is complete
    if (!props.noredirect) {
      Router.push("/me");
    }
  };

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    acceptedFiles,
    rejectedFiles,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    minSize: 0,
    maxSize,
  });

  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  if (uploading) {
    return <p>{appText.messages.uploading}</p>;
  }

  if (uploaded) {
    return <p>{appText.messages.resume.resumeUploaded}</p>;
  }

  return (
    <>
      {/* Input field to enter a title for the resume */}
      <InputField
        type="text"
        change={setResumeTitle}
        label={appText.messages.resume.resumteTitle}
        placeholder={appText.messages.resume.pleaseEnterTitle}
        name="resumeTitle"
        required
        rounded
      />
      <div className="ResumeUploadForm">
        <div className="DropZoneContainer">
          <div className={"DropArea"} {...getRootProps()}>
            <input className={"DropArea"} {...getInputProps()} />
            {!isDragActive &&
              acceptedFiles.length === 0 &&
              `${appText.messages.clickHereToUpload}!`}
            {isDragActive && !isDragReject && `${appText.messages.dropItNow}!`}
            {isDragReject && `${appText.messages.validation.fileTypeNotValid}!`}
            {acceptedFiles.length > 0 &&
              `${appText.messages.resume.resumeSelected}!`}
            {isFileTooLarge && (
              <div className="text-danger mt-2">
                {appText.messages.validation.fileIsTooLarge}.
              </div>
            )}
          </div>
        </div>
        <ButtonGroup>
          {!props.noredirect && (
            <Button onClick={() => Router.push("/me")} fullWidth color="2">
              {appText.messages.doItLater} 🕑
            </Button>
          )}
          {acceptedFiles.length > 0 && (
            <Mutation
              mutation={SIGN_UPLOAD_MUTATION}
              variables={
                fileToUpload
                  ? { fileType: fileToUpload.type, fileName: fileToUpload.name }
                  : {}
              }
            >
              {(signUploadMutation, { error, loading, data }) => {
                if (loading) return <p>loading</p>;
                if (error) return <p>Something went wrong</p>;
                return (
                  <Mutation
                    mutation={CREATE_RESUME_MUTATION}
                    refetchQueries={props.refetchQueries}
                  >
                    {(createResumeMutation, { error, loading, data }) => {
                      if (loading) return <p>{appText.messages.uploading}</p>;
                      if (error) return <p>Something went wrong</p>;
                      if (data) return <p>{appText.messages.uploaded}</p>;
                      return (
                        <Button
                          disabled={
                            acceptedFiles.length === 0 ||
                            loading ||
                            !resumeTitle.valid
                          }
                          onClick={() =>
                            uploadFile(signUploadMutation, createResumeMutation)
                          }
                          fullWidth
                        >
                          {resumeTitle.valid
                            ? appText.actions.upload
                            : appText.messages.resume.enterTitle}
                        </Button>
                      );
                    }}
                  </Mutation>
                );
              }}
            </Mutation>
          )}
        </ButtonGroup>
        <style jsx>{`
          .ResumeUploadForm {
            width: 100%;
            margin: 0 auto;
          }

          .DropZoneContainer {
            height: 200px;
            width: 100%;
            border: 2px dashed ${variables.accentColor1};
            background-color: ${variables.clearColor};
            padding: 20px;
            border-radius: ${variables.roundedRadius};
            transform: scale(${isDragActive ? 1.2 : 1});
            transition: 200ms;
            animation-timing-function: ease-in;
            margin-bottom: 25px;
          }

          .DropZoneContainer .DropArea {
            height: 100%;
            width: 100%;
          }

          input {
            outline: none;
          }
        `}</style>
      </div>
    </>
  );
};

export default ResumeUploadForm;
