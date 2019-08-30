import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import variables from "../common/globalVariables";
import Button from "../common/UI/Button";
import { handleUpload } from "../../lib/upload";

const SIGN_UPLOAD_MUTATION = gql`
  mutation SIGN_UPLOAD_MUTATION($fileName: String!, $fileType: String!) {
    signFileUpload(fileName: $fileName, fileType: $fileType) {
      signedRequest
      url
    }
  }
`;

const ResumeUploadForm = () => {
  const [fileToUpload, setFileToUpload] = useState(null);

  const maxSize = 1048576;

  const onDrop = useCallback(acceptedFiles => {
    setFileToUpload(acceptedFiles[0]);
  }, []);

  const uploadFile = async signUploadMutation => {
    const result = await signUploadMutation();
    console.log(result);
    const uploadRes = await handleUpload(
      result.data.signFileUpload.signedRequest,
      fileToUpload,
      fileToUpload.type
    );
    console.log(uploadRes);
  };

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    acceptedFiles,
    rejectedFiles,
    isDragAccept
  } = useDropzone({
    onDrop,
    accept: ["application/pdf"],
    minSize: 0,
    maxSize
  });

  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  return (
    <div className="ResumeUploadForm">
      <div className="DropZoneContainer">
        <div className={"DropArea"} {...getRootProps()}>
          <input className={"DropArea"} {...getInputProps()} />
          {!isDragActive &&
            acceptedFiles.length === 0 &&
            "Click here or drop a file to upload!"}
          {isDragActive && !isDragReject && "Drop it like it's hot!"}
          {isDragReject && "File type not accepted, sorry!"}
          {acceptedFiles.length > 0 && "It worked"}
          {isFileTooLarge && (
            <div className="text-danger mt-2">File is too large.</div>
          )}
        </div>
      </div>
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
          if (data) return <p>Uploading</p>;
          return (
            <Button
              disabled={acceptedFiles.length === 0}
              click={() => uploadFile(signUploadMutation)}
              fullWidth
            >
              Upload
            </Button>
          );
        }}
      </Mutation>
      <style jsx>{`
        .ResumeUploadForm {
          width: 100%;
          max-width: 500px;
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
  );
};

export default ResumeUploadForm;
