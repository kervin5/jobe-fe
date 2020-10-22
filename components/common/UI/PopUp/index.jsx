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

  .card {
    width: 100% !important;
    max-width: 500px;

    .header {
      margin: 10px;
    }
  }

  .Content {
    z-index: 999;
    position: relative;
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
          <div className="Content">
            <Paper>
              <Title inline>{title}</Title>
              <Button
                onClick={() => changeHandler(false)}
                iconOnly
                icon="close"
                float={"right"}
              />
              <div>{children}</div>
            </Paper>
          </div>
        </StyledPopUp>
      )}
    </PopUpContext.Consumer>
  );
}

PopUp.defaultProps = { title: "" };

export default PopUp;
