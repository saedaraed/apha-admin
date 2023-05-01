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

export default function ShowDetails({
  openDetails,
  handleCloseDetails,
  data,
  headerName,
  info,
}) {
  console.log(data);
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
      open={openDetails ? true : false}
      onClose={handleCloseDetails}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Details</DialogTitle>
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
            display:'flex',
            marginTop: "25px",
          }}
          id="alert-dialog-description"
        >
          <Stack>
            {data.map((elem) => (
              <Typography fontWeight={500} fontSize={"14px"} color={"#000"} sx={{marginBottom:'20px'}}>
                {elem.headerName} 
              </Typography>
            ))}
          </Stack>
      
          <Stack>
            {info.map((elem) => (
              <Typography fontWeight={500} fontSize={"14px"} color={"#000"}  sx={{marginBottom:'20px'}}>
                : &nbsp; {elem}
              </Typography>
            ))}
          </Stack>
        </DialogContentText>
      </DialogContent>
      <hr />
      <DialogActions sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          onClick={handleCloseDetails}
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
