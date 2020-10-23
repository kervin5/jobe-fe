import { useState } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import PopUpContext from "./PopUpContext";
import Title from "../Title";
import Button from "../Button";

const StyledPopUp = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 199;
  display: flex;
  justify-content: center;
  align-items: center;

  .Container {
    width: 100% !important;
    max-width: 500px;

    padding: 30px;
  }

  .Content {
    z-index: 999;
    position: relative;
  }

  .CloseButton {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const PopUp = (props) => {
  const [title, setTitle] = useState(props.title);

  return (
    props.show && (
      <PopUpContext.Provider value={{ title, setTitle }}>
        <PopupContent {...props} />
      </PopUpContext.Provider>
    )
  );
};

function PopupContent({ children, changeHandler }) {
  return (
    <PopUpContext.Consumer>
      {({ title, setTitle }) => (
        <StyledPopUp className="PopUp">
          <Paper className="Container">
            <div className="Content">
              <Title level={2}>{title}</Title>
              <Button
                onClick={() => changeHandler(false)}
                iconOnly
                icon="close"
                className="CloseButton"
              />
              <div>{children}</div>
            </div>
          </Paper>
        </StyledPopUp>
      )}
    </PopUpContext.Consumer>
  );
}

PopUp.defaultProps = { title: "" };

export default PopUp;
