import React, { useRef, useState, Component } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.defaultValue || "",
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  updateContent = (value) => {
    this.props.onChange(
      { target: { name: this.props.name, value } },
      { name: this.props.name, value }
    );
    this.setState({ content: value });
  };
  /**
   * @property Jodit jodit instance of native Jodit
   */
  jodit;
  setRef = (jodit) => (this.jodit = jodit);

  config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    minHeight: 720,
  };
  render() {
    return (
      <div className="field JoditEditor">
        <label>{this.props.label}</label>
        <JoditEditor
          editorRef={this.setRef}
          value={this.state.content}
          config={this.config}
          onChange={this.updateContent}
        />
        <style jsx>{`
          .JoditEditor :global(.jodit_wysiwyg ul, .jodit_wysiwyg ol) {
            padding-left: 40px;
          }
        `}</style>
      </div>
    );
  }
}
