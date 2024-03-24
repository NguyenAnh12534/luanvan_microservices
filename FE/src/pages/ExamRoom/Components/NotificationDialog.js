import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";

const NotificationDialog = (props) => {

    const { open } = props;
    
    return (
        <Dialog open={open}>
          <DialogTitle color="red">Lost a chance</DialogTitle>
          <DialogContent>
            <Typography>
                Someone has chosen correct answer.
            </Typography>
          </DialogContent>
        </Dialog>
      );
}

export default NotificationDialog;