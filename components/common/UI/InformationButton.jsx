import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";

const StyledInformationButton = styled.div`
  display: inline-block;
  margin: 0 10px;
  position: relative;

  .InformationButtonMessage {
    display: none;
    position: absolute;
    z-index: 222;
    min-width: 500px;
    box-shadow: 0px 3px 37px -24px rgba(0, 0, 0, 0.75);
    height: 0.01;
    overflow: hidden;
  }

  &:hover .InformationButtonMessage {
    display: block;
  }
`;

const InformationButton = ({ message, title }) => {
  return (
    <StyledInformationButton className="InformationButton">
      <Button
        color="secondary"
        type="button"
        icon="exclamation"
        size="small"
        onClick={(e) => e.preventDefault()}
      />
      <div className="InformationButtonMessage">
        <Alert severity="warning">
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </div>
    </StyledInformationButton>
  );
};

export default InformationButton;
