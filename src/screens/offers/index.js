import { Button, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicTable from "../../components/table";
import { getAdminDataThunk } from "../../redux/features/adminData/adminActions";
import { Delete, Visibility } from "@mui/icons-material";
import CustomizedDialogs from "../../components/popUp";
import ConfirmDialog from "../../components/confirmationMessage";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../GlobalStyle";

const Offers = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminData.adminData);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [IdTodelete, setIdTodelete] = useState("");
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const offers = [
    {
      field: "index",
      headerName: "#",
    },
    {
      field: "title",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 200,
    },
    {
      field: "price",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "clinic",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 80,
    },
    {
      field: "expier",
      headerName: "expiration date",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "description",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 200,
    },
    // {
    //   field: "image",
    //   flex: 1,
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 80,
    //   renderCell: ({ row }) => (
    //     <IconButton key={row.id} onClick={() => handleView(row.image)}>
    //       <Visibility
    //         sx={{
    //           fill: "rgba(60, 192, 185, 1)",
    //         }}
    //       />
    //     </IconButton>
    //   ),
    // },
    {
      field: "actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      renderCell: ({ row }) => (
        <>
        <Stack sx={{display:'flex' , flexDirection:'row' , gap:'5px'}}>
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
            <IconButton key={row.id} onClick={() => handleOpenConfirm(row.id)}>
              <Delete
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
              onClick={() => navigate(`/offer/${row.id}`)}
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
            <IconButton key={row.id} onClick={() => handleView(row.image)}>
              <Visibility
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
  const getData = async () => {
    const resp = await dispatch(
      getAdminDataThunk({
        url: "dashboard/offers",
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const handleView = (image) => {
    setImage(image);
    setOpen(true);
  };

  const handleOpenConfirm = (id) => {
    setConfirmOpen(true);
    setIdTodelete(id);
  };

  const handleClose = () => {
    setConfirmOpen(false);
  };

  const handleDelete = async () => {
    const { data } = await axios.delete(
      "http://myasem.online/public/api/dashboard/deleteOffer",
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
  return (
    <Stack spacing={4}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <Typography fontWeight={600} fontSize={"28px"} color={"#0A0A0A"}>
          Offers
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
          onClick={() => navigate("/create-offer")}
        >
          <Typography
            sx={{
              border: "solid 2px #fff",
              // padding: "0px 5px",
              width:'20px',
              height:'20px',
              borderRadius: "5px",
              display:'flex',
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            +{" "}
          </Typography>{" "}
          Add
        </CustomButton>
        <CustomizedDialogs
          src={image}
          alt={image}
          open={open}
          setOpen={setOpen}
        />
        <ConfirmDialog
          open={confirmOpen}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
      </Stack>
      <BasicTable columns={offers} rows={data} />
    </Stack>
  );
};

export default Offers;
