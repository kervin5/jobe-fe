import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useInput from "../useInput";
const CKEditor = dynamic(() => import("./CKEditor"), {
  ssr: false
});

const RichTextInputField = props => {
  const validation = {
    required: props.required,
    maxLength: props.maxLength,
    minLength: props.minLength
  };

  const [touched, setTouched] = useState(false);
  const [richTextFieldState, setRichTextFieldState] = useInput({
    type: props.inputType,
    value: props.value,
    placeholder: props.placeholder,
    name: props.name,
    validation: validation,
    editorState: null
  });

  const changeHandler = data => {
    if (props.change) {
      props.change({
        value: data,
        errors: richTextFieldState.errors,
        touched,
        valid: richTextFieldState.valid
      });
    }

    setTouched(true);
    setRichTextFieldState(data);
  };

  const handleBlur = e => {
    setTouched(true);
    setRichTextFieldState(richTextFieldState.value);
  };

  useEffect(() => {
    if (!props.touched && props.validate) {
      setTouched(true);
    }
    if ((touched || props.validate) && props.change) {
      setRichTextFieldState(richTextFieldState.value);
      props.change({ ...richTextFieldState, touched });
    }
  }, [
    touched,
    props.validate,
    richTextFieldState.valid,
    richTextFieldState.value,
    richTextFieldState.valid
  ]);

  return (
    <div className="Editor">
      <CKEditor
        data={richTextFieldState.value}
        onChange={(event, editor) => {
          const data = editor.getData();
          // console.log({ event, editor, data });
          changeHandler(data);
        }}
        onBlur={(event, editor) => {
          // console.log("Blur.", editor);
          handleBlur();
        }}
        onFocus={(event, editor) => {
          // console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default RichTextInputField;
