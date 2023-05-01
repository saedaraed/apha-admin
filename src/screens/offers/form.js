import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  FormLabel,
  Input,
  Stack,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CustomButton, CustomizedTextField } from "../../GlobalStyle";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { format } from "date-fns-tz";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material";
import '../../index.css'
import {
  createOfferThunk,
  getAdminDataThunk,
} from "../../redux/features/adminData/adminActions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BrokenImageOutlined } from "@mui/icons-material";
import { toast } from "react-hot-toast";
const schema = yup.object({
  description: yup.string().required(),
  title: yup.string().required(),
  price: yup.string().required(),
  clinic: yup.string().required(),
});

const OfferForm = () => {
  const [offerData, setOfferData] = useState();
  const [valueTo, setValueTo] = useState(format(new Date(), "yyyy-MM-dd"));

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
    }
  
}));

  const [Image, setImage] = useState("");
  const [initImage, setInitImage] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.adminData.isLoading);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const filteredData = covertToFormData(data);
    const res = await dispatch(
      createOfferThunk({
        url: `http://myasem.online/public/api/dashboard/offer${
          params.id ? `/${params.id}` : ""
        }`,
        filteredData,
        params: params.id ? "put" : "",
      })
    );
    if (createOfferThunk.fulfilled.match(res)) {
      if (!params.id) {
        reset();
        setValueTo(format(new Date(), "yyyy-MM-dd"));
        navigate("/offers");
        toast.success("offer added");
      } else {
        navigate("/offers");
        toast.success("offer edited");
      }
    }
  };
  function covertToFormData(data) {
    const formData = new FormData();
    formData.append("clinic", data.clinic);
    formData.append("description", data.description);
    if (Image) formData.append("image", Image);
    formData.append("price", data.price);
    formData.append("title", data.title);
    formData.append("expier", valueTo);

    return formData;
  }

  const getUserData = async () => {
    if (params.id) {
      const response = await dispatch(
        getAdminDataThunk({
          url: `offer/${params.id}`,
        })
      );
      const data = response.payload.items;
      if (getAdminDataThunk.fulfilled.match(response)) {
        setOfferData(data[0]);
        setValue("description", data[0].description);
        setValue("clinic", data[0].clinic);
        setValue("title", data[0].title);
        setValue("price", data[0].price);
        setInitImage(data[0].image);
      }
      console.log('datsa' , data)
    }
  };
  useEffect(() => {
    getUserData();
  }, [params]);
  useEffect(() => {
    if (offerData && offerData.id) {
      setValueTo(offerData.expier);
    }
  }, [offerData]);
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <>
     <Typography fontWeight={600} fontSize={"28px"} color={"#0A0A0A"}>
          Add Offers
        </Typography>
   
    <Stack
      sx={{
        padding: 2,
      }}
      alignItems={"center"}
      spacing={2}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"start"}
        flexWrap={"wrap"}
        gap={3}
      >
        <Stack spacing={1} width={"100%"} minWidth="400px" id="title" sx={{marginBottom:'20px'}}>
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 500,
              
            }}
            error={errors.title ? true : false}
          >
            {errors.title ? errors.title.message : "Offer Address"}
          </FormLabel>
          <StyledInput
            type={"text"}
            placeholder={"Offer Address"}
            variant="outlined"
            {...register("title")}
            sx={{backgroundColor:'#F4F4F480', fontWeight: 500,}}
          />
        </Stack>
        
        <Stack spacing={1} width={"48.5%"} minWidth="400px" id="clinic" sx={{marginBottom:'20px'}}>
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 500,
            }}
            error={errors.clinic ? true : false}
          >
            {errors.clinic ? errors.clinic.message : "Clinic Name"}
          </FormLabel>
          <StyledInput
            type={"text"}
            placeholder={"Clinic Name"}
            variant="outlined"
            {...register("clinic")}
          />
        </Stack>
        <Stack spacing={1} width={"48.5%"} minWidth="400px" id="price" sx={{marginBottom:'20px'}}>
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 500,
            }}
            error={errors.price ? true : false}
          >
            {errors.price ? errors.price.message : "price"}
          </FormLabel>
          <StyledInput
            type={"text"}
            placeholder={"price"}
            variant="outlined"
            {...register("price")}
          />
        </Stack>
        <Stack spacing={1} width={"100%"} minWidth="400px" id="expiration-date" sx={{marginBottom:'20px'}}>
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Offer End Date
          </FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              // disablePast
              openTo="year"
              value={valueTo}
              onChange={(newValueTo) => {
                setValueTo(format(new Date(newValueTo), "yyyy-MM-dd"));
              }}
              renderInput={(params) => (
                <StyledInput
                  label={"expiration date"}
                  placeholder={"expiration date"}
                  variant="outlined"
                  required
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Stack>

        <Stack width={"100%"} id="description" sx={{marginBottom:'20px'}}>
          <FormLabel error={errors.description ? true : false} sx={{color:'#000' , marginBottom:'5px'}}>
            {errors.description ? errors.description.message : "Description Offer"}
          </FormLabel>
          <StyledInput
            id="outlined-textarea"
            placeholder="Add notes here"
            multiline
            minRows={5}
            {...register("description")}
          />
        </Stack>

        <Stack
          width={"100%"} sx={{marginBottom:'10px'}}
          // justifyContent={"space-between"}
          // direction={"row"}
        >
             <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 500,
              marginBottom:'5px'
            }}
          >
            Image About Offer
          </FormLabel>
          <Box
            component={"label"}
            justifyContent={"center"}
            alignItems="center"
            sx={{
              display: "flex",
              bgcolor: "#fff",
              flexDirection: "column",
              cursor: "pointer",
              border: "2px dashed rgba(10, 10, 10, 0.2)",
              borderRadius: "4px",
              width: "100%",
              height: "123px",
            }}
          >
            {Image || initImage ? (
              <img
                width={"100%"}
                height="100%"
                style={{
                  objectFit: "contain",
                }}
                src={Image ? URL.createObjectURL(Image) : initImage}
                alt=""
              />
            ) : (
              <>
                <BrokenImageOutlined
                  sx={{
                    fill: "green",
                  }}
                  fontSize="large"
                />
                <Typography fontSize={"14px"} fontWeight={500} color={"#0A0A0A99"}>
                  Upload Image
                </Typography>
              </>
            )}
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </Box>
        </Stack>
      </Stack>
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent="space-between"
        width={"100%"}
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
          
          onClick={() => navigate("/offers")}
        >
          back
        </Button>
        <Button variant="contained"
          textcolor="#f4f4f4"
          sx={{
            bgcolor: "#0E4C8F",
            width:'113px',
            height:'40px'
          }}
         
         
          type="submit"
        >
         save
         </Button>
      </Stack>
    </Stack>
    </>
  );
};

export default OfferForm;
