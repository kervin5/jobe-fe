import React, { useState, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import axios from "axios";

import HtmlRenderer from "@/common/UI/HtmlRender";
import applicationContext from "@/context/applicationContext";
import { systemLanguage } from "@/root/config";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const Translator = ({ children }) => {
  const { language, setLanguage } = React.useContext(applicationContext);
  const [contentToDisplay, setContentToDisplay] = useState(children);

  useEffect(() => {
    if (!!localStorage && localStorage["k-jobboard-system-custom-lang"] && typeof localStorage["k-jobboard-system-custom-lang"] !== "undefined") {
      setLanguage(localStorage["k-jobboard-system-custom-lang"]);
    } else {
      setLanguage(language);
    }
  }, []);

  useEffect(() => {
    if (language && language !== systemLanguage) {
      axios
        .post("/api/translate", {
          url: `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&To=${language ?? systemLanguage}`,
          data: [{ text: renderToStaticMarkup(children) }],
        })
        .then((res) => {
          setContentToDisplay(
            <HtmlRenderer html={res.data.data[0].translations[0].text} />
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setContentToDisplay(children);
    }
  }, [language]);

  return contentToDisplay;
};

export const ListOfLanguages = () => {
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState(null);
  const { language, setLanguage } = React.useContext(applicationContext);

  useEffect(() => {
    axios
      .get(
        "/api/translate?url=https://api.cognitive.microsofttranslator.com/languages?api-version=3.0"
      )
      .then((res) => {
        const fetchedLanguages = res.data.data.translation;
        const options = Object.keys(fetchedLanguages).map(
          (language, index) => ({
            key: language + index,
            text: fetchedLanguages[language].name,
            value: language,
          })
        );
        options.sort((a, b) => {
          if (a.text < b.text) {
            return -1;
          }
          if (a.text > b.text) {
            return 1;
          }
          return 0;
        });
        setLanguages(options);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <p>Cargando</p>
  ) : (
    <FormControl variant="filled">
      <InputLabel id="select-translator-language">Lenguaje</InputLabel>
      <Select
        labelId="select-translator-language"
        id="demo-simple-select-filled"
        onChange={(e, data) => {
          setLanguage(e.target.value);
          localStorage.setItem("k-jobboard-system-custom-lang", data.value);
        }}
        defaultValue={language}
      >
        {languages.map((language, index) => (
          <MenuItem value={language.value} key={index + language.value}>
            <em>{language.text}</em>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Translator;
