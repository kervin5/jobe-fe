import { useState, useEffect } from "react";
import variables from "../../../globalVariables";
import AutoCompleteInputField from "../AutoCompleteInputField/AutoCompleteInputField";
import axios from "axios";

const locationInputField = props => {
  const [locations, setLocations] = useState([]);
  const [options, setOptions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [uri, setUri] = useState("");

  const delayTimeout = () => {
    setIsTyping(true);

    return setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };
  // const [localValue, setLocalValue] = useState("");

  const changeHandler = fieldData => {
    props.change(fieldData);
    // setLocalValue(value);
  };

  useEffect(() => {
    if (!isTyping && uri !== "") {
      axios
        .get(
          "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
            uri +
            ".json" +
            "?access_token=pk.eyJ1Ijoia3Zhc3F1ZXppdCIsImEiOiJjandzNWtjcjUwMHh2NDJxa2toeWJ6N2FlIn0.Qa-IM4Em_QMvC2QWlMvieQ"
        )
        .then(res => {
          setLocations(res.data.features);
        });
    }
  }, [isTyping, uri]);

  const ajaxCallback = value => {
    if (value.length > 2) {
      const encodedValue = encodeURIComponent(value);
      setUri(encodedValue);
    } else {
      setLocations([]);
      setUri("");
    }
    clearTimeout(delayTimeout);
    delayTimeout();
  };

  useEffect(() => {
    const result = locations.map(location => {
      return {
        label: location.place_name,
        value: location.place_name
      };
    });

    setOptions(result);
  }, [locations]);

  return (
    <React.Fragment>
      <AutoCompleteInputField
        placeholder={props.placeholder}
        change={changeHandler}
        callback={ajaxCallback}
        value={props.value || ""}
        options={options}
        validate={props.validate}
        required={props.required}
        ajax
      />
      <style jsx>{`
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
      `}</style>
    </React.Fragment>
  );
};

export default React.memo(locationInputField);
