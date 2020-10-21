import React from "react";

import Modal from "@/common/UI/Modal";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import EditUserForm from "@/components/users/UserMutation/EditUserForm";
import appText from "@/lang/appText";

const EditUserButton = (props) => (
  <Modal
    trigger={
      <IconButton>
        <EditIcon />
      </IconButton>
    }
    header={`${appText.actions.edit} ${appText.objects.user.singular}`}
  >
    <>
      <p>{appText.messages.validation.enterDetails}</p>
      <EditUserForm
        userId={props.userId}
        refetchQueries={props.refetchQueries}
      />
    </>
  </Modal>
);

export default EditUserButton;
