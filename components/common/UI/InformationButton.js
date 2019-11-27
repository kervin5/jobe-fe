import React from "react";
import { Message, Button } from "semantic-ui-react";

const InformationButton = () => {
  return (
    <div className="InformationButton">
      <Button
        circular
        color="yellow"
        type="button"
        icon="exclamation"
        size="mini"
        onClick={e => e.preventDefault()}
      />
      <div className="InformationButtonMessage">
        <Message color="yellow">
          <Message.Header>Attention!</Message.Header>
          <p>
            By enabling this option, the job will be reposted automatically
            every three days. Please only use this option for jobs that you are
            continuously recruiting for. This option will make this job seem
            like it has recently been posted until you opt-out.
          </p>
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
