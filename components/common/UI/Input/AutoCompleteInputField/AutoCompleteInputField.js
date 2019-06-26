import React, { useState, useEffect } from "react";
import variables from "../../../globalVariables";
// import inputStyles from '../InputStyles';

class AutoCompleteInputField extends React.Component {
  _timeoutID;

  state = {
    textFieldValue: this.props.value || "",
    optionsToDisplay: null,
    options: [],
    hasValueFromOptions: false,
    showMenu: false,
    isManagingFocus: false
  };

  inputTextChangeHandler = async e => {
    //Passes the value when the text input is changed
    this.updateField(e.target.value);

    if (this.props.ajax && e.target.value !== "") {
      this.props.callback(e.target.value);
    }
  };

  updateField = value => {
    this.setState({ textFieldValue: value });
    if (!this.props.ajax) {
      this.setState({ options: filterOptions(value, props.options) });
    }
    this.setState({ hasValueFromOptions: this.fieldIsValid(value) }, () => {
      if (this.props.change) {
        if (this.state.hasValueFromOptions) {
          this.props.change(textFieldValue);
        } else {
          this.props.change("");
        }
      }
    });
  };

  fieldIsValid = value => {
    const result = this.props.options.filter(option => {
      return option.value.trim().toLowerCase() === value.trim().toLowerCase();
    });
    return result.length > 0;
  };

  // useEffect(() => {

  //   if (props.change) {
  //     if (hasValueFromOptions) {
  //       props.change(textFieldValue);
  //     } else {
  //       props.change("");
  //     }
  //   }
  // }, [textFieldValue, hasValueFromOptions]);

  handleOptionClick = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Clicked");
    this.setState({
      showMenu: false,
      textFieldValue: value,
      hasValueFromOptions: true
    });
    if (this.props.change) {
      this.props.change(value);
    }
  };

  // useEffect(() => {
  //   if (!showMenu) {
  //     if (!hasValueFromOptions) {
  //       setOptions([]);
  //     }
  //   }
  // }, [showMenu]);

  _onBlur = e => {
    e.preventDefault();
    // e.stopPropagation();
    console.log("Lost");
    this._timeoutID = setTimeout(() => {
      if (this.state.isManagingFocus) {
        this.setState({
          isManagingFocus: false,
          showMenu: false
        });
      }

      if (this.props.change) {
        if (this.state.hasValueFromOptions) {
          this.props.change(this.state.textFieldValue);
        } else {
          this.props.change("");
          this.setState({ textFieldValue: "", options: [] });
        }
      }
    }, 0);
  };

  _onFocus = () => {
    clearTimeout(this._timeoutID);
    if (!this.state.isManagingFocus) {
      this.setState({
        isManagingFocus: true,
        showMenu: true
      });
    }
  };

  render() {
    let options = this.props.ajax ? this.props.options : this.state.options;

    if (this.state.textFieldValue === "") {
      options = [];
    }

    const optionsElements = options.map((option, index) => {
      return (
        <div
          key={index}
          className={"Option"}
          onMouseDown={e => this.handleOptionClick(e, option.value)}
        >
          {option.label}
        </div>
      );
    });

    return (
      <div
        onBlur={this.handleBlur}
        className="AutoCompleteInputField"
        onFocus={this._onFocus}
        onBlur={this._onBlur}
      >
        <input
          type="text"
          placeholder={this.props.placeholder}
          value={this.state.textFieldValue}
          onChange={this.inputTextChangeHandler}
        />
        {this.state.showMenu && (
          <div className={"Options"}>
            {options.length > 0 ? optionsElements : "No results found"}
          </div>
        )}

        <style jsx>{`
          .AutoCompleteInputField {
            width: 100%;
          }

          input,
          textarea,
          select {
            border: none;
            margin: 5px 20px 5px 15px;
            width: 90%;
            outline: none;
          }

          input::placeholder,
          textarea::placeholder,
          select::placeholder {
            color: ${variables.secondaryTextColor};
          }

          textarea {
            min-height: 300px;
            padding-top: 15px;
          }

          label {
            color: ${variables.baseTextColor};
          }

          .Options {
            left: 0;
            right: 0;
            background-color: ${variables.clearColor};
            border: 1px solid ${variables.mutedColor2};
            position: absolute;
            top: 50px;
            z-index: 999;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            padding: 5px 15px;
            box-shadow: 0px 32px 45px -41px rgba(0, 0, 0, 0.75);
            cursor: pointer;
          }

          .Options :global(.Option) {
            margin-bottom: 5px;
          }

          .Options :global(.Option):hover {
            margin-bottom: 5px;
            background-color: blue;
          }
        `}</style>
      </div>
    );
  }
}

const filterOptions = (sentence, options) => {
  const words = sentence
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .split(" ");
  let result = [];
  let filteredWords = [];
  words.forEach(word => {
    if (word.length > 0) {
      options.forEach(option => {
        if (
          option.value.toLowerCase().includes(word.toLowerCase()) &&
          !filteredWords.includes(option.value.toLowerCase())
        ) {
          result.push(option);
          filteredWords.push(option.value.toLowerCase());
        }
      });
    }
  });
  return sentence === "" ? options : result;
};

// const comparisonFn = function(prevProps, nextProps) {

//   return prevProps.options === nextProps.options;
// };

export default AutoCompleteInputField;
