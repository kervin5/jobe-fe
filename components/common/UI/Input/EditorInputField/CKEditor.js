import { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";

class CKEditorWrapper extends Component {
  render() {
    return (
      <div className="CKEditor">
        <CKEditor
          onInit={editor => {
            console.log("Editor is ready to use!", editor);

            // Insert the toolbar before the editable area.
            editor.ui
              .getEditableElement()
              .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
              );
          }}
          editor={DocumentEditor}
          {...this.props}
        />
        <style jsx>
          {`
            .CKEditor {
              background-color: white;
              min-height: 600px;
            }

            .CKEditor :global(.ck-content) {
              min-height: 600px;
            }
          `}
        </style>
      </div>
    );
  }
}
export default CKEditorWrapper;
