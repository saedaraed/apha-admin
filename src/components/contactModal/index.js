import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Divider, Stack } from "@mui/material";
import ImageDelet from "../../assets/Group 41222.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";

import {
    createContactThunk,
    createPageThunk,
    getAdminDataThunk,
  } from "../../redux/features/adminData/adminActions";
import "../../index.css";
import { toast } from "react-hot-toast";
import axios from "axios";
const schema = yup.object({
    type: yup.string().required(),
    value: yup.string().required(),
  });
export default function ContactModal({ openModal, handleCloseModal ,id ,  oneOrderStatus , getDataUpdate, }) {
    // const {
    //     register,
    //     handleSubmit,
    //     reset,
    //     setValue,
    //     formState: { errors },
    //   } = useForm({
    //     resolver: yupResolver(schema),
    //   });
    //   const dispatch = useDispatch();
    // //   const navigate = useNavigate();
    //   const isLoading = useSelector((state) => state.adminData.isLoading);
    // const onSubmit = async (data) => {
    //     const res = await dispatch(
    //       createContactThunk({
    //         url: `http://myasem.online/public/api/dashboard/contact${id}`,
    //         type: data.type,
    //         value: data.value,
    //         // params: params.id ? "put" : "",
    //       })
    //     );
    //     // if (createContactThunk.fulfilled.match(res)) {
    //     //   if (!params.id) {
    //     //     reset();
    //     //     navigate("/contactinfo");
    //     //     toast.success("contact added");
    //     //   } else {
    //     //     navigate("/contactinfo");
    //     //     toast.success("contact edited");
    //     //   }
    //     // }
    //     if (data.status) {
    //         getUserData();
    //         toast.success("edit  succssfully");
    //       }
    //   };
    //   const getUserData = async () => {
       
    //       const response = await dispatch(
    //         getAdminDataThunk({
    //           url: `dashboard/contact`,
    //         })
    //       );
    //       const data = response.payload.items;
    //       if (getAdminDataThunk.fulfilled.match(response)) {
    //         setValue("type", data[0].type);
    //         setValue("value", data[0].value);
    //       }
        
    //   };
    //   React.useEffect(() => {
    //     getUserData();
    //   }, []);


    const [nameStatus, setNameStatus] = React.useState("");
    console.log('nameStatus' , nameStatus)
    const token = localStorage.getItem("userToken");
  
    const handleEdit = async () => {
      const { data } = await axios.post(
        `http://myasem.online/public/api/dashboard/contact/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            id: id,
            value:nameStatus,
          },
        }
      );
      console.log('datamm' , data)
      if (data.value) {
        toast.success("edited succssfully");
        getDataUpdate();
      }
    };
    const dispatch = useDispatch();

    // const handleEdit = async () => {
    //   const { data } = await dispatch(
    //     createContactThunk({
    //               url: `http://myasem.online/public/api/dashboard/contact/${id}`,
    //               // type: type,
    //               value:nameStatus,
    //               id: id ,
    //             })
    //   );
    //   console.log('datamm' , data)
    //   if (data.value) {
    //     toast.success("edited succssfully");
    //     getDataUpdate();
    //   }
    //   else{
    //     // toast.error("خطأة ");

    //   }
    // };
   
    React.useEffect(() => {
        setNameStatus(oneOrderStatus);
      // handleEdit()
    }, [oneOrderStatus])
    const handleChange = (event) => {
        setNameStatus(event.target.value);
      console.log(event.target.value);
  
    
    };
  
  return (
    <Dialog
      open={openModal ? true : false}
      onClose={handleCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle>
       <img src={ImageDelet} />
      </DialogTitle> */}
      <Divider />
      <DialogContent>
     
        {/* <DialogContentText
          sx={{
            color: "#1d1d1d",
            fontSize: "16px",
            textAlign:'center',
            marginTop:'25px',
            
          }}
          fontWeight={600}
          id="alert-dialog-description"
        >
        
        </DialogContentText> */}
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <input type="text" value={nameStatus} onChange={handleChange}/>
        <input type="text"/>
        {/* </form> */}
      </DialogContent>
      <DialogActions sx={{display:'flex' , justifyContent:'center'}}>
        <Button
          variant="contained"
          onClick={() => {
            handleEdit();
            handleCloseModal();

          }}
          sx={{ backgroundColor: "#E00404" , width:'110px' , height:'40px' }}
        >
          Yes
        </Button>
        <Button variant="contained" onClick={handleCloseModal} autoFocus sx={{backgroundColor: "transparent", width:'110px' , height:'40px' , color:'#000'}}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
