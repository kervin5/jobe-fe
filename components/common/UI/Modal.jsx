import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({
  header,
  children,
  open,
  trigger,
  handleClose,
  handleOpen,
  actions,
}) {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      {trigger}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
        <DialogContent>
          <Box id="alert-dialog-description" p={4}>
            {children}
          </Box>
        </DialogContent>
        <DialogActions>
          {actions && actions.map((action, index) => (
            <Button
              onClick={action.onClick}
              key={"ModalActioBtn" + index}
              color="primary"
            >
              {action.content}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </div>
  );
}
