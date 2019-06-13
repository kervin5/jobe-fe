import React, {useState} from 'react';
import NoSSR from 'react-no-ssr';
import { Editor } from 'react-draft-wysiwyg';
import {stateToHTML} from 'draft-js-export-html';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const RichTextInputFields = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const changeHandler = (editorState) => {

    let html = stateToHTML(editorState.getCurrentContent());

    html = "<p><br></p>" === html ? "" : html;

    if(props.change) {
      props.change(html);
    }
    
    setEditorState(editorState);
  };

  return (
   
      <NoSSR>
       <Editor
          placeholder={props.placeholder}
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={changeHandler}
          toolbar={{
            options: props.toolbarOptions || [ 'emoji', 'remove', 'history']
          }}
        />
      </NoSSR>

  )
};

// options: props.toolbarOptions || ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'emoji', 'remove', 'history']

export default RichTextInputFields;

