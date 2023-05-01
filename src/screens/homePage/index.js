import { IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CRUDRequsests from "../../apis";
import { dashboardItem } from "../../assets";
import BasicCard from "../../components/card";
import { getAdminDataThunk } from "../../redux/features/adminData/adminActions";
import Consultation from "../consultation";
import ReplyIcon from "@mui/icons-material/Reply";
import { Visibility } from "@mui/icons-material";
import BasicTable from "../../components/table";
import ShowDetails from "../../components/showDetailsModal";
import ReplyQuestion from "../../components/replyQuestion";
import LastConsultation from "../../components/lastConsulation/lastCosulation";

const HomePage = () => {
  // const [replyOpen, setReplyOpen] = useState(false);
  // const [detailOpen, setDetailOpen] = useState(false);
  // const [oneOrderStatus, setOneOrderStatus] = useState("");

  // const [IdQu, setIdQu] = useState("");
  // const [question, setQuestion] = useState("");
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [clinic, setClinic] = useState("");
  // const [doctor, setDoctor] = useState("");
  // const [answer, setAnswer] = useState("");
  // const consultations = [
  //   {
  //     field: "index",
  //     headerName: "#",
  //     maxWidth: 1,
  //   },
  //   {
  //     field: "name",
  //     headerName: "Name",

  //     flex: 1,
  //     align: "center",
  //     headerAlign: "center",
  //     minWidth: 150,
  //   },
  //   {
  //     field: "email",
  //     headerName: "Email",
  //     flex: 1,
  //     align: "center",
  //     headerAlign: "center",
  //     minWidth: 150,
  //   },
  //   {
  //     field: "mobile",
  //     headerName: "phone",
  //     flex: 1,
  //     align: "center",
  //     headerAlign: "center",
  //     minWidth: 150,
  //   },
  //   {
  //     field: "clinic",
  //     headerName: "Clinic",
  //     flex: 1,
  //     align: "center",
  //     headerAlign: "center",
  //     minWidth: 80,
  //   },
  //   {
  //     field: "doctor",
  //     headerName: "Doctor",

  //     flex: 1,
  //     align: "center",
  //     headerAlign: "center",
  //     minWidth: 150,
  //   },
  //   {
  //     field: "description",
  //     headerName: "Question",
  //     flex: 1,
  //     align: "center",
  //     headerAlign: "center",
  //     minWidth: 300,
  //   },
  //   {
  //     field: "answer",
  //     headerName: "Answers",
  //     flex: 1,
  //     align: "center",
  //     headerAlign: "center",
  //     minWidth: 300,
  //   },
  //   {
  //     field: "action",
  //     flex: 1,
  //     align: "center",
  //     headerAlign: "center",
  //     minWidth: 100,
  //     renderCell: ({ row }) => (
  //       <>
  //         <Stack sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
  //           <Stack
  //             sx={{
  //               background: "#F5F5F5",
  //               width: "28px",
  //               height: "28px",
  //               borderRadius: "50%",
  //               display: "flex",
  //               alignItems: "center",
  //               justifyContent: "center",
  //             }}
  //           >
  //             <IconButton key={row.id} onClick={() => handleOpenReply(row.id)}>
  //               <ReplyIcon
  //                 sx={{
  //                   fill: "#200E32",
  //                   width: "15px",
  //                 }}
  //               />
  //             </IconButton>
  //           </Stack>
  //           <Stack
  //             sx={{
  //               background: "#F5F5F5",
  //               width: "28px",
  //               height: "28px",
  //               borderRadius: "50%",
  //               display: "flex",
  //               alignItems: "center",
  //               justifyContent: "center",
  //             }}
  //           >
  //             <IconButton
  //               key={row.id}
  //               onClick={() => handleOpenDetails(row.id)}
  //             >
  //               <Visibility
  //                 sx={{
  //                   fill: "#200E32",
  //                   width: "15px",
  //                 }}
  //               />
  //             </IconButton>
  //           </Stack>
  //         </Stack>
     
  //       </>
  //     ),
  //   },
  // ];
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminData.adminData);
  console.log(data.order , 'order')
  const token = localStorage.getItem("userToken");
  const [patientData, setPatientData] = useState({});
  const getDataCount= async () => {
    const resp = await dispatch(
      getAdminDataThunk({
        url: "/count",
      })
    );
  };
  const getpatientData = async () => {
    const resp = await CRUDRequsests.get("countoffer", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPatientData(resp.data.items);
  };
  const getCompaniesList = async () => {
    const resp = await axios.get("http://aiph.me:8000/api/clinic/compList");
    sessionStorage.setItem(
      "companiesList",
      JSON.stringify(resp.data.companies)
    );
  };
  const getNationalitiesList = async () => {
    const resp = await axios.get("http://aiph.me:8000/api/clinic/natList");
    sessionStorage.setItem(
      "nationalitiesList",
      JSON.stringify(resp.data.nationalities)
    );
  };
  const getUsersList = async () => {
    const resp = await axios.get("http://aiph.me:8000/api/clinic/usersList");
    sessionStorage.setItem("usersList", JSON.stringify(resp.data.users));
  };

  const getIdTypeList = async () => {
    const resp = await axios.get("http://aiph.me:8000/api/clinic/idTypesList");
    sessionStorage.setItem("IdTypeList", JSON.stringify(resp.data.idTypes));
  };

  useEffect(() => {
    getDataCount();
    getpatientData();
    getCompaniesList();
    getNationalitiesList();
    getUsersList();
    getIdTypeList();
  }, []);
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

  
  // console.log(data, 'gh')
  // const handleClose = () => {
  //   setReplyOpen(false);
  // };
  // const handleOpenReply = (id , status) => {
  //   setReplyOpen(true);
  //   setOneOrderStatus(status);

  //   const filterId = data.filter((ele) => ele.id === id);
  //   setIdQu(filterId[0].id);
  //   setQuestion(filterId[0].description);

  // };
  // const handleCloseDetails = () => {
  //   setDetailOpen(false);
  // };
  // const handleOpenDetails = (id) => {
  //   setDetailOpen(true);
  //   const filterId = data.filter((ele) => ele.id === id);
  //   setIdQu(filterId[0].id);
  //   setQuestion(filterId[0]?.description);
  //   setEmail(filterId[0]?.email);
  //   setName(filterId[0]?.name);
  //   setPhone(filterId[0]?.mobile);
  //   setAnswer(filterId[0]?.answer);
  //   setClinic(filterId[0]?.clinic);
  //   setDoctor(filterId[0].doctor);
  // };
  // const informmation = [IdQu , name, email, phone, clinic , doctor , question , answer];
  // const latestConsolution = data.slice(-5)
  // console.log(latestConsolution ,'kkkk')
  return (
    <>
      <Stack alignItems={"start"} width={"100%"} spacing={4}>
        <Typography fontWeight={600} fontSize={"28px"} color={"#0A0A0A"}>
          Dashboard
        </Typography>
        <Stack flexWrap={"wrap"} gap={4} direction={"row"}>
          <BasicCard
            counter={data.pateint}
            title={"Registered Patients"}
            Icon={dashboardItem[0].icon}
          />
          <BasicCard
            counter={data.openFile}
            title={"Medical Files"}
            Icon={dashboardItem[1].icon}
          />
          <BasicCard
            counter={data?.order}
            title={"Consultations"}
            Icon={dashboardItem[2].icon}
          />
          <BasicCard
            counter={data?.consultation}
            title={"Appointments"}
            Icon={dashboardItem[3].icon}
          />
          <BasicCard
            counter={patientData["All offer"]}
            title={"Total Offers"}
            Icon={dashboardItem[4].icon}
          />

          <BasicCard
            counter={patientData.offerAvalabel}
            title={"Activated Offers"}
            Icon={dashboardItem[5].icon}
          />
          <BasicCard
            counter={patientData["offer exp"]}
            title={"Expired Offers"}
            Icon={dashboardItem[6].icon}
          />
          <BasicCard
            counter={patientData.orderMonth}
            title={"Offers Requests"}
            Icon={dashboardItem[7].icon}
          />
        </Stack>
      </Stack>
      {/* <Stack sx={{marginTop:'20px'}}> */}
      {/* <LastConsultation /> */}
      {/* </Stack> */}
    </>
  );
};

export default HomePage;
