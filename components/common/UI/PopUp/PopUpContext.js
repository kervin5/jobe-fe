import React from "react";

const PopUpContext = React.createContext({
  title: "",
  setTitle: function(title) {
    this.title = title;
  }
});

export default PopUpContext;
