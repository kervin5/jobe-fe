import React from "react";

const ApplicationContext = React.createContext({
  lang: "en",
  setLanguage: function(language) {
    this.language = language;
  }
});

export default ApplicationContext;
