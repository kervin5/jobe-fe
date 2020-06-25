import React from "react";
import { Modal } from "semantic-ui-react";

const ModalExampleScrollingContent = () => (
  <Modal
    trigger={
      <p>
        By clicking the "Register" button, you agree to{" "}
        <a href="#">our Privacy Policy</a>
      </p>
    }
  >
    <Modal.Header>Exact Staff, Inc. Privacy Policy</Modal.Header>
    <Modal.Content image scrolling>
      <Modal.Description>
        <div className="policyContent">
          <iframe src="https://exactstaff.com/documents/Exact-Staff-Onlline-Privacy-Policy-12-31-19.pdf"></iframe>
          <style jsx>{`
            .policyContent {
              with: 100%;

              margin: auto;
            }

            .policyContent iframe {
              width: 100%;
              min-height: 700px;
            }
          `}</style>
        </div>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      {/* <Button type="button" primary>
        Continue <Icon name="chevron right" />
      </Button> */}
    </Modal.Actions>
  </Modal>
);

export default ModalExampleScrollingContent;
