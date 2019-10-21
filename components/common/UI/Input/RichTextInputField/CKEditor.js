import { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import variables from "../../../globalVariables";

class CKEditorWrapper extends Component {
  render() {
    return (
      <div className="CKEditor">
        <CKEditor
          onInit={editor => {
            // console.log("Editor is ready to use!", editor);

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
              border-radius: var(--ck-border-radius);

              /* Set vertical boundaries for the document editor. */
              max-height: 700px;

              /* This element is a flex container for easier rendering. */
              display: flex;
              flex-flow: column nowrap;
            }

            .CKEditor :global(.ck-toolbar) {
              /* Make sure the toolbar container is always above the editable. */
              z-index: 1;

              /* Create the illusion of the toolbar floating over the editable. */
              box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.2);

              /* Use the CKEditor CSS variables to keep the UI consistent. */
              border-bottom: 1px solid var(--ck-color-toolbar-border);

              border: 0;
              border-radius: 0;
            }

            .CKEditor :global(.ck-content) {
              min-height: 600px;
              background: ${variables.clearColor};
              padding-left: 20px;
              padding-right: 20px;
            }
          `}
        </style>
      </div>
    );
  }
}
export default CKEditorWrapper;
