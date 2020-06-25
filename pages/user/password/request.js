import React from "react";
import PasswordResetRequestForm from "@/components/users/PasswordResetRequestForm";
import variables from "@/components/common/globalVariables";
import PageSection from "@/components/common/Layout/PageSection";

const pageStyles = `background-color: ${variables.mutedColor1};
                    padding: 30px;
                    display: flex;
                    flex-direction: column;`;

const passwordRequest = props => {
  return (
    <PageSection style={pageStyles}>
      <PasswordResetRequestForm />
    </PageSection>
  );
};

export default passwordRequest;
