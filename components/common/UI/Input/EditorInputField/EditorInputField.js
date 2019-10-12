import React from "react";
import dynamic from "next/dynamic";
const CKEditor = dynamic(() => import("./CKEditor"), {
  ssr: false
});

const EditorInputField = () => (
  <div className="App">
    <h2>Using CKEditor 5 build in React</h2>
    <CKEditor
      data="<p>Hello from CKEditor 5!</p>"
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
    />
  </div>
);

export default EditorInputField;
