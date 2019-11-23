import React, { useRef, useState, Component } from "react";
import dynamic from "next/dynamic";
import "jodit/build/jodit.min.css";
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false
});

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  updateContent = value => {
    this.props.onChange(null, { name: this.props.name, value });
    this.setState({ content: value });
  };
  /**
   * @property Jodit jodit instance of native Jodit
   */
  jodit;
  setRef = jodit => (this.jodit = jodit);

  config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    minHeight: 720
  };
  render() {
    return (
      <div className="field">
        <label>{this.props.label}</label>
        <JoditEditor
          editorRef={this.setRef}
          value={this.state.content}
          config={this.config}
          onChange={this.updateContent}
        />
      </div>
    );
  }
}
