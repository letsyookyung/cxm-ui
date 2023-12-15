import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';

const ConfirmModal = ({ isOpen, handleClose, title, content, onConfirm }) => (
  <Dialog
    open={isOpen}
    onClose={handleClose}
    aria-labelledby="confirm-dialog-title"
    aria-describedby="confirm-dialog-description"
  >
    <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="confirm-dialog-description">
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        취소
      </Button>
      <Button onClick={onConfirm} color="primary">
        확인
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmModal;
