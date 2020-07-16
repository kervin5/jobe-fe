import React from "react";
import { Message, Button } from "semantic-ui-react";
import appText from "@/lang/appText";

const InformationButton = () => {
  return (
    <div className="InformationButton">
      <Button
        circular
        color="yellow"
        type="button"
        icon="exclamation"
        size="mini"
        onClick={(e) => e.preventDefault()}
      />
      <div className="InformationButtonMessage">
        <Message color="yellow">
          <Message.Header>{appText.messages.attention}!</Message.Header>
          <p>{appText.messages.job.byEnablingRecurring}</p>
        </Message>
      </div>
      <style jsx>{`
        .InformationButton {
          display: inline-block;
          margin: 0 10px;
          position: relative;
        }

        .InformationButton .InformationButtonMessage {
          display: none;
          position: absolute;
          z-index: 222;
          min-width: 500px;
          box-shadow: 0px 3px 37px -24px rgba(0, 0, 0, 0.75);
          height: 0.01;
          overflow: hidden;
        }

        .InformationButton:hover .InformationButtonMessage {
          display: block;
        }
      `}</style>
    </div>
  );
};

export default InformationButton;
