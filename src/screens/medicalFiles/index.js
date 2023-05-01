import { IconButton, Stack, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicTable from "../../components/table";
import { getAdminDataThunk } from "../../redux/features/adminData/adminActions";
import DetailsIcon from "@mui/icons-material/Details";
import CustomizedDialogs from "../../components/popUp";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../GlobalStyle";
import { Visibility } from "@mui/icons-material";

const MedicalFiles = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminData.adminData);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const buttonStyle={
 
    "&:hover": {
  background:"transparent"
    }
  }
  console.log(data , 'kk' )
  const medicalFiles = [
    {
      field: "index",
      headerName: "#",
    },
    // {
    //   field: "name",
    //   flex: 1,
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 200,
    //   renderCell: ({ row }) =>
    //     row.Fname_ar +
    //     " " +
    //     row.Pname_ar +
    //     " " +
    //     row.Gname_ar +
    //     " " +
    //     row.Lname_ar,
    // },
    {
      field: "request_id",
      headerName: "Request No.",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "created_at",
      headerName: "Request Date",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 200,
    },
    {
      field: "approved_by",
      flex: 1,
      align: "center",
      headerAlign: "approved",
      minWidth: 150,
    
    },
    // {
    //   field: "request_type",
    //   headerName: "request type",
    //   flex: 1,
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 150,
    //   renderCell: ({ value }) => (value === "1" ? "Master" : "Modify"),
    // },
  
    {
      field: "request_status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      renderCell: ({ value }) => (
        <Typography
          fontWeight={500}
          fontSize={14}
          sx={{
            // color: "#F4F4F4",
            borderRadius: "10px",
            minWidth: "100px",
            color:
              value === "0"
                ? "#DCC70A"
                : value === "2"
                ? "#0CA437"
                : value === "1"
                ? "#3DACEB"
                : "#058638",
            textAlign: "center",
            padding: "10px",
          }}
        >
          {value === "0" ? "pending" : value === "1" ? "new" : "Approved"}
        </Typography>
      ),
    },

    // {
    //   field: "approved_by",
    //   headerName: "approved by",
    //   flex: 1,
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 150,
    //   renderCell: ({ value }) => {
    //     const approvedBy = JSON.parse(
    //       sessionStorage.getItem("usersList")
    //     ).filter((item) => {
    //       return item.userId === value;
    //     });

    //     if (approvedBy.length === 0) {
    //       return value;
    //     } else {
    //       return approvedBy[0].userName;
    //     }
    //   },
    // },
    {
      field: "details",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      renderCell: ({ row }) => (
        <Stack      sx={{
          background: "#F5F5F5",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
              <IconButton key={row.id}  onClick={() => navigate(`/medical-file/${row.id}`)} sx={buttonStyle}>
                <Visibility
                  sx={{
                    fill: "#200E32",
                    width: "15px",
                  }}
                />
              </IconButton>
            </Stack>
      ),
    },
   
  ];

  const getData = () => {
    dispatch(
      getAdminDataThunk({
        url: "dashboard/allFile",
      })
    );
  };

  useEffect(() => {
    getData();
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
          Medical files
        </Typography>
        {/* <CustomButton
          CustomButton
          textcolor="#f4f4f4"
          variant="contained"
          sx={{
            bgcolor: "#0E4C8F",
          }}
          width={"15%"}
          // onClick={() => navigate("/create-offer")}
        >
          open file
        </CustomButton> */}
        <CustomizedDialogs
          src={image}
          alt={image}
          open={open}
          setOpen={setOpen}
        />
      </Stack>
      <BasicTable columns={medicalFiles} rows={data} />
    </Stack>
  );
};

export default MedicalFiles;
