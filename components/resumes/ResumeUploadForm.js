import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import variables from "../common/globalVariables";
import Button from "../common/UI/Button";

const App = () => {
  const maxSize = 1048576;

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);

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
    accept: "image/*",
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
      <Button fullWidth>Upload</Button>
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

export default App;
