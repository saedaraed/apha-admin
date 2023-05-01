import { Button, IconButton, Stack, Typography } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicTable from "../../components/table";
import { getAdminDataThunk } from "../../redux/features/adminData/adminActions";
import { Delete, Visibility } from "@mui/icons-material";
import ReplyQuestion from "../../components/replyQuestion";
import "../../index.css";
import ShowDetails from "../../components/showDetailsModal";
const Consultation = () => {
  const buttonSX = {
    background: "#F5F5F5",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

  
};
const buttonStyle={
 
  "&:hover": {
background:"transparent"
  }
}
  const [replyOpen, setReplyOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [oneOrderStatus, setOneOrderStatus] = useState("");

  const [IdQu, setIdQu] = useState("");
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [clinic, setClinic] = useState("");
  const [doctor, setDoctor] = useState("");
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminData.adminData);
  //  const lastElem = data.slice(-5)
  const consultations = [
    {
      field: "index",
      headerName: "#",
      maxWidth: 1,
    },
    {
      field: "name",
      headerName: "Name",

      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "mobile",
      headerName: "phone",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "clinic",
      headerName: "Clinic",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 80,
    },
    {
      field: "doctor",
      headerName: "Doctor",

      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "description",
      headerName: "Question",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 300,
    },
    {
      field: "answer",
      headerName: "Answers",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 300,
    },
    {
      field: "action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: ({ row }) => (
        <>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <Stack
              sx={buttonSX}
            >
              <IconButton   sx={buttonStyle} key={row.id} onClick={() => handleOpenReply(row.id)}>
                <ReplyIcon
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
                onClick={() => handleOpenDetails(row.id)}
                sx={buttonStyle}
              >
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
  // console.log(consultations, "qun");
  const getData = async () => {
    const resp = await dispatch(
      getAdminDataThunk({
        url: "dashboard/allConsultation",
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);
  const handleClose = () => {
    setReplyOpen(false);
  };
  const handleOpenReply = (id , status) => {
    setReplyOpen(true);
    setOneOrderStatus(status);

    const filterId = data.filter((ele) => ele.id === id);
    setIdQu(filterId[0].id);
    setQuestion(filterId[0].description);

  };
  const handleCloseDetails = () => {
    setDetailOpen(false);
  };
  const handleOpenDetails = (id) => {
    setDetailOpen(true);
    const filterId = data.filter((ele) => ele.id === id);
    setIdQu(filterId[0].id);
    setQuestion(filterId[0]?.description);
    setEmail(filterId[0]?.email);
    setName(filterId[0]?.name);
    setPhone(filterId[0]?.mobile);
    setAnswer(filterId[0]?.answer);
    setClinic(filterId[0]?.clinic);
    setDoctor(filterId[0].doctor);
  };
  const informmation = [IdQu , name, email, phone, clinic , doctor , question , answer];

  // const getData = async () => {
  //   const resp = await dispatch(
  //     getAdminDataThunk({
  //       url: "/consultation",
  //     })
  //   );
  
  // };
  return (
    <Stack alignItems={"start"} width={"100%"} spacing={4}>
      <Typography fontWeight={600} fontSize={"28px"} color={"#0A0A0A"}>
        Consultations
      </Typography>
      <ReplyQuestion
        open={replyOpen}
        handleClose={handleClose}
        oneOrderStatus={oneOrderStatus}
        getData={getData}
        rowData={question}
      />
      <ShowDetails
        openDetails={detailOpen}
        handleCloseDetails={handleCloseDetails}
        data={consultations}
        headerName={data.headerName}
        info ={informmation}

      />
      <BasicTable columns={consultations} rows={data} />
    </Stack>
  );
};

export default Consultation;
