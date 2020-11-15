import { useState } from "react";
import MaterialPopUp from "./MaterialPopUp";
import PopUpContext from "./PopUpContext";

const PopUp = (props) => {
  const [title, setTitle] = useState(props.title);

  return (
    <PopUpContext.Provider value={{ title, setTitle }}>
      <PopupContent {...props} />
    </PopUpContext.Provider>
  );
};

function PopupContent({ children, changeHandler, show }) {
  return (
    <PopUpContext.Consumer>
      {({ title }) => (
        <MaterialPopUp
          title={title}
          show={show}
          close={() => changeHandler(false)}
        >
          {children}
        </MaterialPopUp>
      )}
    </PopUpContext.Consumer>
  );
}

PopUp.defaultProps = { title: "" };

export default PopUp;
