import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Button, Divider, FormLabel, Stack } from "@mui/material";
import ImageDelet from "../../assets/Group 41222.png";
import "../../index.css";
import { CustomButton, CustomizedTextField } from "../../GlobalStyle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as yup from "yup";

const schema = yup.object({
    type: yup.string().required(),
    value: yup.string().required(),
  });
  
export default function FormContact({ open, handleClose }) {

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
      const dispatch = useDispatch();

      const contactType = ["FB", "TW", "IG", "TK", "SC", "WA", "YT", "E", "PH"];

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
         <Stack
      spacing={3}
      width={"40%"}
      component={"form"}
    >
      <FormLabel
        sx={{
          color: "rgba(10, 10, 10, 1)",
          fontWeight: 600,
          fontSize: "16px",
        }}
      >
      </FormLabel>
      <Stack id="type">
        <FormLabel
          sx={{
            color: "rgba(10, 10, 10, 1)",
            fontWeight: 500,
            fontSize: "16px",
          }}
          error={errors.type ? true : false}
        >
          {errors.type ? errors.type.message : "type"}
        </FormLabel>

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={contactType}
          renderInput={(params) => (
            <CustomizedTextField
              placeholder="Select Type"
              {...params}
              {...register("type")}
            />
          )}
        />
      </Stack>

      <Stack id="value">
        <FormLabel
          sx={{
            color: "rgba(10, 10, 10, 1)",
            fontWeight: 500,
            fontSize: "16px",
          }}
          error={errors.value ? true : false}
        >
          {errors.value ? errors.value.message : "value"}
        </FormLabel>
        <CustomizedTextField
          id="outlined-textarea"
          placeholder="Add notes here"
          multiline
          maxRows={5}
          fullWidth
          {...register("value")}
        />
      </Stack>

      <Stack spacing={2} direction={"row"} width={"100%"} id="Button">
 
        <CustomButton
          textcolor="#f4f4f4"
          variant="contained"
          width={"49%"}
          sx={{
            bgcolor: "#0E4C8F",
          }}
          type="submit"
        >
          submit
        </CustomButton>
      </Stack>
    </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{display:'flex' , justifyContent:'center'}}>
        {/* <Button
          variant="contained"
          onClick={() => {
            handleDelete();
            handleClose();
          }}
          sx={{ backgroundColor: "#E00404" , width:'110px' , height:'40px' }}
        >
          Yes
        </Button> */}
        <Button variant="contained" onClick={handleClose} autoFocus sx={{backgroundColor: "transparent", width:'110px' , height:'40px' , color:'#000'}}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
