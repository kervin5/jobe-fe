import React, { useState, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import axios from "axios";
import { Select } from "semantic-ui-react";
import HtmlRenderer from "@/common/UI/HtmlRenderer";
import applicationContext from "@/context/applicationContext";
import { systemLanguage } from "@/root/config";

const Translator = ({ children }) => {
  const { language, setLanguage } = React.useContext(applicationContext);
  const [contentToDisplay, setContentToDisplay] = useState(children);

  useEffect(() => {
    if (!!localStorage && localStorage["k-jobboard-system-custom-lang"]) {
      setLanguage(localStorage["k-jobboard-system-custom-lang"]);
    } else {
      setLanguage(language);
    }
  }, []);

  useEffect(() => {
    if (language !== systemLanguage) {
      axios
        .post("/api/translate", {
          url: `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&To=${language}`,
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
    <p>Loading</p>
  ) : (
    <Select
      className="ListOfLanguages"
      options={languages}
      defaultValue={language}
      onChange={(e, data) => {
        setLanguage(data.value);
        localStorage.setItem("k-jobboard-system-custom-lang", data.value);
      }}
    />
  );
};

export default Translator;
