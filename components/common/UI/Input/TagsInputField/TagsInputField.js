import React from "react";
import ReactTags from "react-tag-autocomplete";
import NoSSR from "react-no-ssr";
import variables from "../../../globalVariables";

class TagsInputField extends React.Component {
  constructor(props) {
    super(props);
    let suggestions = [];

    if (props.options) {
      suggestions = props.options.map((option, index) => {
        return { id: index, name: option };
      });
    }

    this.state = {
      tags: props.tags || [],
      suggestions: props.options ? suggestions : [],
      valid: false,
      touched: false,
      value: "",
      errors: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.validate !== this.props.validate && this.props.validate) {
      this.passValueToChangeProp(this.state.tags);
    }
  }

  handleDelete(i) {
    const tags = this.state.tags.slice(0);
    const removedTag = this.state.tags[i];
    tags.splice(i, 1);
    this.setState({ tags });
    this.passValueToChangeProp(tags);
    this.updateSuggestions(removedTag);
  }

  handleAddition(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
    this.passValueToChangeProp(tags);
    this.updateSuggestions(tag, "remove");
  }

  passValueToChangeProp = tags => {
    const values = tags.map(tag => tag.name).join(",");

    if (values === "" && this.props.validation.required) {
      this.setState(
        {
          valid: false,
          value: values,
          touched: true,
          errors: ["Please enter at least one value"]
        },
        () => {
          if (this.props.change) {
            this.props.change(this.state);
          }
        }
      );
    } else {
      this.setState(
        {
          valid: true,
          value: values,
          touched: true,
          errors: []
        },
        () => {
          if (this.props.change) {
            this.props.change(this.state);
          }
        }
      );
    }
  };

  updateSuggestions = (tag, action) => {
    if (action === "remove") {
      const updatedSuggestions = this.state.suggestions.filter(suggestion => {
        return suggestion.id !== tag.id;
      });

      this.setState({ suggestions: updatedSuggestions });
    } else {
      const updatedSuggestions = this.state.suggestions.concat(tag);
      this.setState({ suggestions: updatedSuggestions });
    }
  };

  render() {
    return (
      <NoSSR>
        <ReactTags
          tags={this.state.tags}
          suggestions={this.state.suggestions}
          handleDelete={this.handleDelete.bind(this)}
          minQueryLength={1}
          autofocus={false}
          handleAddition={this.handleAddition.bind(this)}
        />
        <style jsx global>{`
          .react-tags {
            display: flex;
            width: 100%;
          }

          button,
          input {
            margin: auto 2px;
          }

          input {
            padding: 5px;
            min-width: 100px;
            border: none;
          }

          button {
            background-color: ${variables.accentColor1};
            border: 1px solid white;
            padding: 5px 10px;
            color: ${variables.clearColor};
            border-radius: 5px;
          }

          .react-tags__suggestions {
            background-color: ${variables.clearColor};
            position: absolute;
            z-index: 1999;
            box-shadow: 0px 9px 16px -4px rgba(0, 0, 0, 0.55);
            border-radius: 10px;
            overflow: hidden;
          }

          .react-tags__suggestions li {
            list-style-type: none;
            font-size: 0.8em;
            margin-bottom: 5px;
            padding: 4px 15px;
            transition: 300ms;
          }

          .react-tags__suggestions li:hover {
            background-color: ${variables.accentColor2};
            color: ${variables.clearColor};
          }

          .react-tags__suggestions li:last-child {
            margin-bottom: 0px;
          }
        `}</style>
      </NoSSR>
    );
  }
}

export default TagsInputField;
