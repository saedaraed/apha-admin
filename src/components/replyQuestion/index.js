import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Divider, FormLabel, Stack, Typography } from "@mui/material";
import ImageDelet from "../../assets/Group 41222.png";
import "../../index.css";
import { CustomizedTextField } from "../../GlobalStyle";
import { styled } from "@mui/material";
import { useParams } from "react-router-dom";

export default function ReplyQuestion({ open, handleClose, rowData }) {
  console.log(rowData, "ss");

  const StyledInput = styled(CustomizedTextField)(({ theme }) => ({
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
      backgroundColor: "#F4F4F480",
      fontSize: "13px",
      fontWeight: "400",
    },
    "& .css-9n2qpj-MuiStack-root>:not(style)+:not(style)": {
      backgroundColor: "#F4F4F480",
      fontSize: "13px",
      fontWeight: "400",
    },
    "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root ": {
      backgroundColor: "#F4F4F480",
      fontSize: "13px",
      fontWeight: "400",
      border: " 0.25px solid rgba(10, 10, 10, 0.1)",
    },
  }));
  const StyledModal = styled(Dialog)(({ theme }) => ({
    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
      width: "732px",
      height: "543px",
    },
  }));
  return (
    <StyledModal
      open={open ? true : false}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Reply</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Stack>
        <DialogContentText
          sx={{
            color: "#1d1d1d",
            fontSize: "14px",
            height: "auto",
            marginTop: "25px",
          }}
          fontWeight={600}
          id="alert-dialog-description"
        >
          <Typography fontWeight={500} fontSize={"14px"} color={"#000"}>
            Question: {rowData}
          </Typography>

          <Stack
            width={"100%"}
            id="description"
            sx={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <FormLabel
              sx={{ color: "#000", marginBottom: "5px", fontSize: "14px" }}
            >
              Write a Reply
            </FormLabel>
            <StyledInput
              id="outlined-textarea"
              placeholder="Add notes here"
              multiline
              minRows={10}
            />
          </Stack>
        </DialogContentText>
      </DialogContent>
      <hr />
      <DialogActions sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          onClick={() => {
            handleClose();
          }}
          sx={{ backgroundColor: "#2C509F", width: "110px", height: "40px" }}
        >
          Reply
        </Button>
        <Button
          variant="contained"
          onClick={handleClose}
          autoFocus
          sx={{
            backgroundColor: "transparent",
            border: "solid 1px #2C509F",
            width: "110px",
            boxShadow: "none",
            height: "40px",
            color: "#000",
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </StyledModal>
  );
}
