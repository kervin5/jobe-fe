import React, { useState, useEffect } from "react";
import variables from "../../../globalVariables";
// import inputStyles from '../InputStyles';

class AutoCompleteInputField extends React.PureComponent {
  _timeoutID;

  state = {
    value: this.props.value || "",
    optionsToDisplay: null,
    options: [],
    hasValueFromOptions: false,
    showMenu: false,
    isManagingFocus: false,
    valid: true,
    errors: [],
    name: this.props.name || ""
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.validate !== prevProps.validate && this.props.validate) {
      this.validate();
    }
  }

  inputTextChangeHandler = e => {
    //Passes the value when the text input is changed
    this.updateField(e.target.value);
    this.setState({ showMenu: true });

    if (this.props.ajax && e.target.value !== "") {
      this.props.callback(e.target.value);
    }
  };

  updateField = value => {
    this.setState({ value });
    if (!this.props.ajax) {
      this.setState({ options: filterOptions(value, props.options) });
    }
    this.setState({ hasValueFromOptions: this.fieldIsValid(value) }, () => {
      if (this.props.change) {
        if (this.state.hasValueFromOptions) {
          this.props.change({
            name: this.state.name,
            value,
            valid: this.state.valid,
            errors: this.state.errors
          });
        } else {
          this.setState(
            {
              valid: false,
              errors: ["Please select an option from the dropdown"],
              options: []
            },
            () => {
              this.props.change({
                name: this.state.name,
                value: this.state.value,
                valid: this.state.valid,
                errors: this.state.errors
              });
            }
          );
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

  validate = () => {
    this.setState(
      { hasValueFromOptions: this.fieldIsValid(this.state.value) },
      () => {
        if (this.props.change) {
          if (this.state.hasValueFromOptions) {
            this.props.change({
              name: this.state.name,
              value: this.state.value,
              valid: this.state.valid,
              errors: this.state.errors
            });
          } else {
            this.setState(
              {
                valid: false,
                errors: ["Please select an option from the dropdown"],
                options: []
              },
              () => {
                this.props.change({
                  name: this.state.name,
                  value: this.state.value,
                  valid: this.state.valid,
                  errors: this.state.errors
                });
              }
            );
          }
        }
      }
    );
  };

  handleOptionClick = (e, value) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState(
      {
        showMenu: false,
        value: value,
        hasValueFromOptions: true,
        valid: true,
        errors: []
      },
      () => {
        if (this.props.change) {
          this.props.change({
            name: this.state.name,
            value,
            valid: this.state.valid,
            errors: this.state.errors
          });
        }
      }
    );
  };

  _onBlur = e => {
    e.preventDefault();
    // e.stopPropagation();

    this._timeoutID = setTimeout(() => {
      if (this.state.isManagingFocus) {
        this.setState({
          isManagingFocus: false,
          showMenu: false
        });
      }

      if (this.props.change) {
        if (this.state.hasValueFromOptions) {
          this.props.change({
            name: this.state.name,
            value: this.state.value,
            valid: this.state.valid,
            errors: this.state.errors
          });
        } else {
          this.setState(
            {
              errors: ["Please select an option from the dropdown"],
              options: []
            },
            () => {
              this.props.change({
                name: this.state.name,
                valid: false,
                value: this.state.value,
                valid: this.state.valid,
                errors: this.state.errors
              });
            }
          );
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
          value={this.state.value}
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
            padding: 5px 0px;
            box-shadow: 0px 32px 45px -41px rgba(0, 0, 0, 0.75);
            cursor: pointer;
          }

          .Options :global(.Option) {
            margin-bottom: 5px;
            padding: 10px;
            transition: 200ms;
          }

          .Options :global(.Option):hover {
            background-color: ${variables.accentColor3};
            color: ${variables.clearColor};
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
