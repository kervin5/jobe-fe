import React from "react";
import { Modal } from "semantic-ui-react";
import appText from "@/lang/appText";
import { companyInfo } from "@/root/config";

const ModalExampleScrollingContent = () => (
  <Modal
    trigger={
      <p style={{ textAlign: "center" }}>
        {appText.messages.account.agreement + " "}
        <a href="#">{appText.objects.privacyPolicy.singular}</a>
      </p>
    }
  >
    <Modal.Header>
      {companyInfo.name} {appText.objects.privacyPolicy.singular}
    </Modal.Header>
    <Modal.Content image scrolling>
      <Modal.Description>
        <div className="policyContent">
          <iframe src={process.env.NEXT_PUBLIC_PRIVACY_POLICY_LINK}></iframe>
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
