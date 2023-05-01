import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, Button, FormLabel, Stack, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CustomButton, CustomizedTextField } from "../../GlobalStyle";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createPageThunk,
  getAdminDataThunk,
} from "../../redux/features/adminData/adminActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
const schema = yup.object({
  description: yup.string().required(),
  title: yup.string().required(),
  type: yup.string().required(),

});

const PagesForm = () => {
  const params = useParams();
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
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await dispatch(
      createPageThunk({
        url: `http://myasem.online/public/api/dashboard/page${
          params.id ? `/${params.id}` : ""
        }`,
        
        title: data.title,
        type: data.type,
        description: data.description,
        params: params.id ? "put" : "",
      })
    );
    if (createPageThunk.fulfilled.match(res)) {
      if (!params.id) {
        reset();
        navigate("/pages");
        toast.success("page added");
      } else {
        toast.success("page edited");
        navigate("/pages");
      }
    }
  };
  const getUserData = async () => {
    if (params.id) {
      const response = await dispatch(
        getAdminDataThunk({
          url: `dashboard/page/${params.id}`,
        })
      );
      const data = response.payload.items;
      if (getAdminDataThunk.fulfilled.match(response)) {
        setValue("description", data[0].description);
        setValue("title", data[0].name);
        setValue("type", data[0].type);
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, [params]);
  const pageType = ["page1", "page2"];

  const StyledInput = styled(CustomizedTextField)(({ theme }) => ({
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
      
      backgroundColor: "#F4F4F480",
      fontSize:'13px',
      fontWeight:'400'
    },
    "& .css-9n2qpj-MuiStack-root>:not(style)+:not(style)":{
      backgroundColor: "#F4F4F480",
      fontSize:'13px',
      fontWeight:'400'
    },
    "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root ":{
      backgroundColor: "#F4F4F480",
      fontSize:'13px',
      fontWeight:'400'
    }, 
    "& .css-8ewcdo-MuiInputBase-root-MuiOutlinedInput-root" :{
      backgroundColor: "#F4F4F480",

    }
  
}));

  return (
    <Stack
      spacing={3}
      width={"100%"}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={1} id="title"  sx={{marginBottom:'20px'}}>
        <FormLabel
          sx={{
            color: "#0A0A0A",
            fontSize: "16px",
            fontWeight: 500,
            
          }}
          error={errors.title ? true : false}
        >
          {errors.title ? errors.title.message : "Page Title"}
        </FormLabel>
        <StyledInput
          type={"text"}
          placeholder={"title"}
          variant="outlined"
          {...register("title")}
          sx={{backgroundColor:'#F4F4F480', fontWeight: 500,}}

        />
      </Stack>
      <Stack id="type">
        <FormLabel
          sx={{
            color: "#0A0A0A",
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
          options={pageType}
          renderInput={(params) => (
            <CustomizedTextField
              placeholder="Select Type"
              {...params}
              {...register("type")}
            />
          )}
        />
      </Stack>
      <Stack spacing={1} id="description"  sx={{marginBottom:'20px'}}>
        <FormLabel
        sx={{color:'#000' , marginBottom:'5px'}}
          error={errors.description ? true : false}
        >
          {errors.description ? errors.description.message : "Page Content"}
        </FormLabel>
        <StyledInput
          id="outlined-textarea"
          placeholder="Add notes here"
          multiline
          minRows={17}
          fullWidth
          {...register("description")}
        />
      </Stack>
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent="space-between"
        id="Button"
      >
        
          <Button
          border={"1px solid #0E4C8F"}
          textcolor="#000"
          variant="contained"
          sx={{
            bgcolor: "#fff",
            color:'#000',
            width:'113px',
            height:'40px'
          }}
        
          onClick={() => navigate("/pages")}
        >
          Back
          </Button>
        <Button
          textcolor="#f4f4f4"
          variant="contained"
          sx={{
            bgcolor: "#0E4C8F",
            width:'113px',
            height:'40px'
          }}
         
          type="submit"
        >
          Add
        </Button>
      </Stack>
    </Stack>
  );
};

export default PagesForm;
