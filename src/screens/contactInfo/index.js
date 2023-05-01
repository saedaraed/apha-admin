import { Button, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicTable from "../../components/table";
import { getAdminDataThunk } from "../../redux/features/adminData/adminActions";
import { Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import ConfirmDialog from "../../components/confirmationMessage";
import { CustomButton } from "../../GlobalStyle";
// import FormContact from "../../components/formContact";
import ContactModal from "../../components/contactModal";

const ContactInfo = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminData.adminData);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [IdTodelete, setIdTodelete] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [IdToupdate, setIdToupdate] = useState("");

  const [openModal , setOpenModal] =useState(false)
  const [nameStatus,setoneNameStatus]=useState('');
  console.log('nameStatus' , nameStatus)
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const buttonStyle={
 
    "&:hover": {
  background:"transparent"
    }
  }
  const offers = [
    {
      field: "index",
      headerName: "#",
    },
    {
      field: "value",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 400,
    },
    {
      field: "type",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },

    {
      field: "actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      renderCell: ({ row }) => (
        <>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <Stack
              sx={{
                background: "#F5F5F5",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
             {/* <IconButton
                key={row.id}
                onClick={() => navigate(`/contact/${row.id}`)}
              >  */}
                   <IconButton
                key={row.id}
                onClick={() => handleOpenModal(row.id, row.value)} sx={buttonStyle}
              > 
                
                <EditIcon
                  sx={{
                    fill: "#200E32",
                    width: "15px",
                  }}
                />
              </IconButton>
            </Stack>
            <Stack
              sx={{
                background: "#F5F5F5",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                key={row.id}
                onClick={() => handleOpenConfirm(row.id)} sx={buttonStyle}
              >
                <Delete
                  sx={{
                    fill: "#200E32",
                    width: "15px",
                  }}
                />
              </IconButton>
            </Stack>
          </Stack>
        </>
      ),
    },
  ];
  const handleOpenConfirm = (id , value) => {
    setConfirmOpen(true);
    setoneNameStatus(value);

    setIdTodelete(id);
  };
  const handleClose = () => {
    setConfirmOpen(false);
  };

  const handleDelete = async () => {
    const { data } = await axios.delete(
      "http://myasem.online/public/api/dashboard/deleteContact",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          id: IdTodelete,
        },
      }
    );
    if (data.status) {
      getData();
      toast.success("deleted succssfully");
    }
  };

  const getData = async () => {
    const resp = await dispatch(
      getAdminDataThunk({
        url: "contact",
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);

  // const handleOpenForm = (id) => {
  //   setFormOpen(true);
  // };
  // const handleCloseForm = () => {
  //   setFormOpen(false);
  // };

  ///////////

  const handleOpenModal= (id , value) => {
    setOpenModal(true);
    setoneNameStatus(value);

   setIdToupdate(id);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const getDataUpdate = async () => {
    const resp = await dispatch(
      getAdminDataThunk({
        url: "/dashboard/contact",
      })
    );
  
  };

  useEffect(() => {
    getDataUpdate();
  }, []);
  return (
   
    <Stack spacing={4}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <Typography fontWeight={600} fontSize={"28px"} color={"#0A0A0A"}>
          contact information
        </Typography>
        <CustomButton
          textcolor="#f4f4f4"
          variant="contained"
          sx={{
            bgcolor: "#058638",
            display: "flex",
            gap: "10px",
            fontSize: "15px",
          }}
          width={"12%"}
          onClick={() => navigate("/create-contact")}
        >
          Add
        </CustomButton>
        <ConfirmDialog
          open={confirmOpen}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
      </Stack>
      {/* <FormContact   open={formOpen}
          handleClose={handleCloseForm}/> */}
      <ContactModal handleCloseModal={handleCloseModal} openModal={openModal} id={IdToupdate} getDataUpdate={getDataUpdate} oneOrderStatus={nameStatus}/>
      <BasicTable columns={offers} rows={data ? data : []} />
    </Stack>
  );
};

export default ContactInfo;
