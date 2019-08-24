import React, { useState, useEffect } from "react";
import NoSSR from "react-no-ssr";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import { EditorState, convertFromHTML } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import useInput from "../useInput";

const RichTextInputFields = props => {
  const validation = {
    required: props.required,
    maxLength: props.maxLength,
    minLength: props.minLength
  };

  console.log(props.value);
  const blocksFromHTML = convertFromHTML(props.value);
  const defaultState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const [editorState, setEditorState] = useState(
    props.value ? defaultState : EditorState.createEmpty()
  );
  const [touched, setTouched] = useState(false);
  const [richTextFieldState, setRichTextFieldState] = useInput({
    type: props.inputType,
    value: props.value,
    placeholder: props.placeholder,
    name: props.name,
    validation: validation,
    editorState: null
  });

  const changeHandler = editorState => {
    let html = stateToHTML(editorState.getCurrentContent());

    html = "<p><br></p>" === html ? "" : html;

    if (props.change) {
      props.change({
        value: html,
        errors: richTextFieldState.errors,
        touched,
        valid: richTextFieldState.valid
      });
    }

    setTouched(true);
    setRichTextFieldState(html);
    setEditorState(editorState);
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
    <NoSSR>
      <Editor
        onBlur={handleBlur}
        placeholder={props.placeholder}
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={changeHandler}
        toolbar={{
          options: props.toolbarOptions || ["emoji", "remove", "history"]
        }}
      />
    </NoSSR>
  );
};

// options: props.toolbarOptions || ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'emoji', 'remove', 'history']

export default RichTextInputFields;
