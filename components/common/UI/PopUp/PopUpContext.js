import React from "react";

const PopUpContext = React.createContext({});

export const PopUpProvider = PopUpContext.Provider;
export const PopUpConsumer = PopUpContext.Consumer;
export default PopUpContext;
