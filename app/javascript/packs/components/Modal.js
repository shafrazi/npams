import React from "react";
import { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, makeStyles } from "@material-ui/core";

import { NpaContext } from "../Context";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
  };
});

function Modal(props) {
  const classes = useStyles();
  const { openModal, handleCloseModal } = useContext(NpaContext);
  const { childComponent, modalTitle } = props;

  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{modalTitle}</DialogTitle>
      <DialogContent>{childComponent}</DialogContent>
    </Dialog>
  );
}

export default Modal;
