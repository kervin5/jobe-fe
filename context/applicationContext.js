import React from "react";
import { systemLanguage } from "@/root/config";

const ApplicationContext = React.createContext({
  lang: systemLanguage,
  setLanguage: function(language) {
    this.language = language;
  },
});

export default ApplicationContext;
