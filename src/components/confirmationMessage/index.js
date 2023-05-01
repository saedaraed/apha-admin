import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Divider, Stack } from "@mui/material";
import ImageDelet from "../../assets/Group 41222.png";
import "../../index.css";
export default function ConfirmDialog({ open, handleClose, handleDelete }) {
  return (
    <Dialog
      open={open ? true : false}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle>
       <img src={ImageDelet} />
      </DialogTitle> */}
      <Divider />
      <DialogContent>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={ImageDelet} />
        </Stack>
        <DialogContentText
          sx={{
            color: "#1d1d1d",
            fontSize: "16px",
            textAlign:'center',
            marginTop:'25px',
            
          }}
          fontWeight={600}
          id="alert-dialog-description"
        >
          Are you sure to complete the deletion process?{" "}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{display:'flex' , justifyContent:'center'}}>
        <Button
          variant="contained"
          onClick={() => {
            handleDelete();
            handleClose();
          }}
          sx={{ backgroundColor: "#E00404" , width:'110px' , height:'40px' }}
        >
          Yes
        </Button>
        <Button variant="contained" onClick={handleClose} autoFocus sx={{backgroundColor: "transparent", width:'110px' , height:'40px' , color:'#000'}}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
