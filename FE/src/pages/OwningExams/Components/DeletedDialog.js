import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const DeletedDialog = (props) => {
    const { title, content, open, handleClose, handleClick } = props;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus  size="small" onClick={handleClose}>
                    Cancel
                </Button>
                <Button size="small" color="error" variant="contained" disableElevation onClick={handleClick}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeletedDialog;
