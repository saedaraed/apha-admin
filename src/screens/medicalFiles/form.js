import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CustomButton, CustomizedTextField } from "../../GlobalStyle";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOfferThunk,
  createPageThunk,
  getAdminDataThunk,
  medicalFormThunk,
  updateMedicalFile,
} from "../../redux/features/adminData/adminActions";
import { useNavigate, useParams } from "react-router-dom";
import { BrokenImageOutlined } from "@mui/icons-material";
import axios from "axios";
const schema = yup.object({
  masterCode: yup.string().required(),
  Fname_ar: yup.string().required(),
  Pname_ar: yup.string().required(),
  Gname_ar: yup.string().required(),
  Lname_ar: yup.string().required(),
  Fname_en: yup.string().required(),
  Pname_en: yup.string().required(),
  Gname_en: yup.string().required(),
  Lname_en: yup.string().required(),
  identity_number: yup.string().required(),
  mobile: yup.string().required(),
  email: yup.string(),
  insurance_no: yup.string().required(),
  pay_date: yup.string(),
  insurance_end_date: yup.string().required(),
  DOB: yup.string().required(),
  created_at: yup.string().required(),
  updated_at: yup.string().required(),
});

const MedicalForm = () => {
  const [submitType, setSubmitType] = useState();
  const [Image, setImage] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [initImage, setInitImage] = useState("");
  const [requestType, setRequestType] = useState();
  const [nationality, setNationality] = useState();
  const [companiesList, setCompaniesList] = useState();
  const [IdTypes, setIdTypes] = useState();
  const [genderType, setGenderType] = useState();
  const [requestStatusState, setRequestStatus] = useState();
  const [approvedBy, setApprovedBy] = useState();
  const [PoliciesList, setPoliciesList] = useState();
  const [policy, setPolicy] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const gender = [
    { code: "0", name: "other" },
    { code: "1", name: "male" },
    { code: "2", name: "female" },
  ];
  const requestStatus = [
    { code: "0", name: "pending" },
    { code: "1", name: "new" },
    { code: "2", name: "completed" },
  ];

  const requestTypes = [
    { code: "1", name: "Master" },
    { code: "2", name: "Modify" },
  ];

  function updateFormData(data) {
    const formData = new FormData();
    formData.append("request_type", requestType.code);
    formData.append("Fname_ar", data.Fname_ar);
    formData.append("Fname_ar", data.Fname_ar);
    formData.append("Pname_ar", data.Pname_ar);
    formData.append("Gname_ar", data.Gname_ar);
    formData.append("Lname_ar", data.Lname_ar);
    formData.append("Fname_en", data.Fname_en);
    formData.append("Pname_en", data.Pname_en);
    formData.append("Gname_en", data.Gname_en);
    formData.append("Lname_en", data.Lname_en);
    formData.append("nationality", nationality.natCode);
    formData.append("id_type", IdTypes.idTypeCode);
    formData.append("gender", genderType.code);
    formData.append("identity_number", data.identity_number);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("insurance_company", companiesList.compCode);
    if (requestType.code === 1)
      formData.append("insurance_no", data.insurance_no);
    formData.append("DOB", data.DOB);
    formData.append("insurance_end_date", data.insurance_end_date);
    formData.append("request_status", requestStatusState.code);
    formData.append("DOB", data.DOB);
    formData.append("approved_by", approvedBy.userId);
    formData.append("created_at", data.created_at);
    formData.append("updated_at", data.updated_at);
    formData.append("policy_id", policy.policyCode);
    if (Image) formData.append("image", Image);
    return formData;
  }
  function addFormData(data) {
    const reader = new FileReader();
    reader.readAsDataURL(Image);
    reader.onload = () => {
      const base64Ready = reader.result.split(",")[1];

      setBase64Image(base64Ready);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
    const formData = new FormData();
    // formData.append("mastPtCode", data.masterCode);
    formData.append("policyCode", policy.policyCode);
    formData.append("idImg", base64Image);
    // formData.append("Fname_ar", data.Fname_ar);
    // formData.append("Fname_ar", data.Fname_ar);
    // formData.append("Pname_ar", data.Pname_ar);
    // formData.append("Gname_ar", data.Gname_ar);
    // formData.append("Lname_ar", data.Lname_ar);
    // formData.append("Fname_en", data.Fname_en);
    // formData.append("Pname_en", data.Pname_en);
    // formData.append("Gname_en", data.Gname_en);
    // formData.append("Lname_en", data.Lname_en);
    // formData.append("nationality", nationality.natCode);
    // formData.append("id_type", IdTypes.idTypeCode);
    // formData.append("gender", genderType.code);
    // formData.append("identity_number", data.identity_number);
    // formData.append("email", data.email);
    // formData.append("mobile", data.mobile);
    // formData.append("insurance_company", companiesList.compCode);
    // if (requestType.code === 1)
    //   formData.append("insurance_no", data.insurance_no);
    // formData.append("DOB", data.DOB);
    // formData.append("insurance_end_date", data.insurance_end_date);
    // formData.append("request_status", requestStatusState.code);
    // formData.append("DOB", data.DOB);
    // formData.append("approved_by", approvedBy.userId);
    // formData.append("created_at", data.created_at);
    // formData.append("updated_at", data.updated_at);
    // formData.append("policy_id", policy.policyCode);
    return formData;
  }
  const getPatientEligibility = async (patientID) => {
    const response = await axios.get(
      `http://aiph.me:8000/api/patient/PtElg?patientId=${patientID}`
    );
    return response.data.mastPtCode;
  };
  const getPoliciesList = async (compCode) => {
    const response = await axios.get(
      `http://aiph.me:8000/api/clinic/polcyList?compCode=${compCode}`
    );
    return response.data;
  };

  const getUserData = async () => {
    setLoading(true);
    const response = await dispatch(
      medicalFormThunk({
        url: `http://myasem.online/public/api/dashboard/FileDetails/${params.id}`,
      })
    );
    const data = response.payload.items;
    if (medicalFormThunk.fulfilled.match(response)) {
      const policyAuto = getPoliciesList(data[0].insurance_company);
      policyAuto.then((value) => {
        setPoliciesList(value.policies);
        setPolicy(
          value.policies.find(
            (element) => element.policyCode === data[0].policy_id
          )
        );
      });
      const masterCode = getPatientEligibility(data[0].identity_number);
      masterCode.then((value) => setValue("masterCode", value));
      setValue("Fname_ar", data[0].Fname_ar);
      setValue("Pname_ar", data[0].Pname_ar);
      setValue("Gname_ar", data[0].Gname_ar);
      setValue("Lname_ar", data[0].Lname_ar);
      setValue("Fname_en", data[0].Fname_en);
      setValue("Pname_en", data[0].Pname_en);
      setValue("Gname_en", data[0].Gname_en);
      setValue("Lname_en", data[0].Lname_en);
      setValue("identity_number", data[0].identity_number);
      setValue("mobile", data[0].mobile);
      setValue("email", data[0].email);
      setValue("insurance_no", data[0].insurance_no);
      setValue("insurance_end_date", data[0].insurance_end_date);
      setValue("pay_date", data[0].pay_date);
      setValue("DOB", data[0].DOB);
      setValue("created_at", data[0].created_at);
      setValue("updated_at", data[0].updated_at);
      setInitImage(data[0].image);
      setRequestType(
        requestTypes.find((element) => element.code === data[0].request_type)
      );
      setNationality(
        JSON.parse(sessionStorage.getItem("nationalitiesList")).find(
          (element) => element.natCode === data[0].nationality
        )
      );
      setCompaniesList(
        JSON.parse(sessionStorage.getItem("companiesList")).find(
          (element) => element.compCode === data[0].insurance_company
        )
      );
      setIdTypes(
        JSON.parse(sessionStorage.getItem("IdTypeList")).find(
          (element) => element.idTypeCode === data[0].id_type
        )
      );
      setGenderType(gender.find((element) => element.code === data[0].gender));
      setRequestStatus(
        requestStatus.find((element) => element.code === data[0].request_status)
      );
      setApprovedBy(
        JSON.parse(sessionStorage.getItem("usersList")).find(
          (element) => element.userId === data[0].approved_by
        )
      );
      if (PoliciesList) {
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);
  const onSubmit = async (data) => {
    switch (submitType) {
      case 1:
        {
          const filteredData = updateFormData(data);
          const res = await dispatch(
            updateMedicalFile({
              url: `http://myasem.online/public/api/dashboard/file/${params.id}`,
              filteredData,
            })
          );
          if (updateMedicalFile.fulfilled.match(res)) {
            navigate("/medical-files");
          }
        }
        break;
      case 2:
        const filteredData = addFormData(data);
        const resp = axios.post(
          "http://aiph.me:8000/api/clinic/addNewPt/",
          filteredData
        );

        break;
      default:
    }
  };

  // if (loading) return <CircularProgress />;

  return (
    <>
      <Typography fontWeight={600} fontSize={"28px"} color={"#0A0A0A"}>
        Order Details
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
          sx={{
            textAlign: "left",
            background: "rgba(5, 134, 56, 0.07)",
            width: "100%",
            padding: "15px",
          }}
        >
          <Typography sx={{ color: "#058638" }}>1. personal data</Typography>
        </Stack>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"start"}
          flexWrap={"wrap"}
          gap={3}
        >
          <Stack spacing={1} width={"45%"} minWidth="250px" id="title">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              File Type :
            </FormLabel>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={requestTypes}
              getOptionLabel={(option) => option.name}
              value={requestType}
              onChange={(e, value) => setRequestType(value)}
              renderInput={(params) => (
                <CustomizedTextField
                  placeholder="Select Type"
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} width={"45%"} minWidth="250px" id="clinic">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Master File Number :
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"master code"}
              disabled={requestType?.code === "2" ? true : false}
              variant="outlined"
              {...register("masterCode")}
            />
          </Stack>
        </Stack>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"start"}
          flexWrap={"wrap"}
          gap={3}
        >
          <Stack spacing={1} width={"20%"} minWidth="250px" id="title">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              First Name (Arabic)
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"first name"}
              variant="outlined"
              {...register("Fname_ar")}
            />
          </Stack>
          <Stack spacing={1} width={"20%"} minWidth="250px" id="clinic">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Parent Name
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"parent name"}
              variant="outlined"
              {...register("Pname_ar")}
            />
          </Stack>
          <Stack spacing={1} width={"16%"} minWidth="250px" id="price">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Grandfather Name
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              variant="outlined"
              {...register("Gname_ar")}
            />
          </Stack>
          <Stack spacing={1} width={"16%"} minWidth="250px" id="price">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Last Name
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"last name"}
              variant="outlined"
              {...register("Lname_ar")}
            />
          </Stack>
        </Stack>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"start"}
          flexWrap={"wrap"}
          gap={3}
        >
          <Stack spacing={1} width={"20%"} minWidth="250px" id="title">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              First Name (English)
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"first name"}
              variant="outlined"
              {...register("Fname_en")}
            />
          </Stack>
          <Stack spacing={1} width={"20%"} minWidth="250px" id="clinic">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Parent Name
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"parent name"}
              variant="outlined"
              {...register("Pname_en")}
            />
          </Stack>
          <Stack spacing={1} width={"20%"} minWidth="250px" id="price">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Grandfather Name
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"grandfather name"}
              variant="outlined"
              {...register("Gname_en")}
            />
          </Stack>
          <Stack spacing={1} width={"20%"} minWidth="250px" id="price">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Last Name
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"last name"}
              variant="outlined"
              {...register("Lname_en")}
            />
          </Stack>
        </Stack>
        <Stack
          sx={{
            textAlign: "left",
            background: "rgba(5, 134, 56, 0.07)",
            width: "100%",
            padding: "15px",
          }}
        >
          <Typography sx={{ color: "#058638" }}>2. identity data</Typography>
        </Stack>

        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"start"}
          flexWrap={"wrap"}
          gap={3}
        >
          <Stack spacing={1} width={"48%"} minWidth="250px" id="title">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              nationality
            </FormLabel>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={JSON.parse(sessionStorage.getItem("nationalitiesList"))}
              getOptionLabel={(option) => option.natName}
              value={nationality}
              onChange={(e, value) => setNationality(value)}
              renderInput={(params) => (
                <CustomizedTextField
                  placeholder="Select Type"
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                  }}
                  // {...register("nationality")}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} width={"48%"} minWidth="250px" id="title">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Id Type
            </FormLabel>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={JSON.parse(sessionStorage.getItem("IdTypeList"))}
              getOptionLabel={(option) => option.idTypeName}
              value={IdTypes}
              onChange={(e, value) => setIdTypes(value)}
              renderInput={(params) => (
                <CustomizedTextField
                  placeholder="Select Type"
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                  }}
                  {...register("IdType")}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} width={"48%"} minWidth="250px" id="title">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              identity number
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"identity number"}
              variant="outlined"
              {...register("identity_number")}
            />
          </Stack>
          <Stack spacing={1} width={"48%"} minWidth="250px" id="clinic">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              mobile
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"mobile"}
              variant="outlined"
              {...register("mobile")}
            />
          </Stack>
          <Stack spacing={1} width={"48%"} minWidth="250px" id="price">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              email
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"email"}
              variant="outlined"
              {...register("email")}
            />
          </Stack>
        </Stack>
        <Stack
          sx={{
            textAlign: "left",
            background: "rgba(5, 134, 56, 0.07)",
            width: "100%",
            padding: "15px",
          }}
        >
          <Typography sx={{ color: "#058638" }}>3. Insurance data</Typography>
        </Stack>

        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"start"}
          flexWrap={"wrap"}
          gap={3}
        >
          <Stack spacing={1} width={"48%"} minWidth="250px" id="title">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Insurance Company
            </FormLabel>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={JSON.parse(sessionStorage.getItem("companiesList"))}
              getOptionLabel={(option) => option.compName}
              value={companiesList}
              onChange={(e, value) => setCompaniesList(value)}
              renderInput={(params) => (
                <CustomizedTextField
                  placeholder="Select Type"
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} width={"48%"} minWidth="250px" id="title">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Insurance policy
            </FormLabel>
            {PoliciesList ? (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={PoliciesList}
                getOptionLabel={(option) => option.policyName}
                value={policy}
                onChange={(e, value) => setPolicy(value)}
                renderInput={(params) => (
                  <CustomizedTextField
                    placeholder="Select Type"
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            ) : (
              <CircularProgress />
            )}
          </Stack>

          <Stack spacing={1} width={"48%"} minWidth="250px" id="title">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Insurance Number
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"insurance number"}
              variant="outlined"
              {...register("insurance_no")}
            />
          </Stack>
          <Stack spacing={1} width={"48%"} minWidth="250px" id="clinic">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Pay Date
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"pay date"}
              variant="outlined"
              disabled={true}
              {...register("pay_date")}
            />
          </Stack>
          <Stack spacing={1} width={"48%"} minWidth="250px" id="price">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Birth of Date
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"date of birth"}
              variant="outlined"
              {...register("DOB")}
            />
          </Stack>
          <Stack spacing={1} width={"48%"} minWidth="250px" id="price">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Insurance End Date
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"insurance end date"}
              variant="outlined"
              {...register("insurance_end_date")}
            />
          </Stack>
          <Stack spacing={1} width={"48%"} minWidth="250px" id="price">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Gender
            </FormLabel>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={gender}
              getOptionLabel={(option) => option.name}
              value={genderType}
              onChange={(e, value) => setGenderType(value)}
              renderInput={(params) => (
                <CustomizedTextField
                  placeholder="Select Type"
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                  }}
                  {...register("gender")}
                />
              )}
            />
          </Stack>
        </Stack>
        <Stack
          sx={{
            textAlign: "left",
            background: "rgba(5, 134, 56, 0.07)",
            width: "100%",
            padding: "15px",
          }}
        >
          <Typography sx={{ color: "#058638" }}>4. Order Status</Typography>
        </Stack>

        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"start"}
          flexWrap={"wrap"}
          gap={3}
        >
          <Stack spacing={1} width={"48%"} minWidth="250px" id="title">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Request Status
            </FormLabel>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={requestStatus}
              getOptionLabel={(option) => option.name}
              value={requestStatusState}
              onChange={(e, value) => setRequestStatus(value)}
              renderInput={(params) => (
                <CustomizedTextField
                  placeholder="Select Type"
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} width={"48%"} minWidth="250px" id="title">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Approved By
            </FormLabel>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={JSON.parse(sessionStorage.getItem("usersList"))}
              getOptionLabel={(option) => option.userName}
              value={approvedBy}
              onChange={(e, value) => setApprovedBy(value)}
              renderInput={(params) => (
                <CustomizedTextField
                  placeholder="Select Type"
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} width={"48%"} minWidth="250px" id="title">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Request Date
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"requet date"}
              variant="outlined"
              {...register("created_at")}
            />
          </Stack>
          <Stack spacing={1} width={"48%"} minWidth="250px" id="clinic">
            <FormLabel
              sx={{
                color: "#0A0A0A",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              Updated_at
            </FormLabel>
            <CustomizedTextField
              type={"text"}
              placeholder={"updated_at"}
              variant="outlined"
              {...register("updated_at")}
            />
          </Stack>
        </Stack>
        {/* <Box
          component={"label"}
          justifyContent={"center"}
          alignItems="center"
          sx={{
            display: "flex",
            bgcolor: "#fff",
            flexDirection: "column",
            cursor: "pointer",
            border: "1px dashed rgba(10, 10, 10, 0.2)",
            borderRadius: "4px",
            width: "50%",
            height: "300px",
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
                  fill: "rgba(10, 10, 10, 0.2)",
                }}
                fontSize="large"
              />
              <Typography fontSize={"12px"} fontWeight={500}>
                Upload logo here
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
        </Box> */}
        <Stack sx={{display:'flex' , flexDirection:'row' , width:'100%' , justifyContent:'end' , gap:'10px' , paddingTop:'110px' , flexWrap:'wrap'}}>
          <Button
            type="submit"
            onClick={() => setSubmitType(1)}
            sx={{ background: "#0E4C8F", color: "#fff", minWidth: "214px" , width:'214px' , height:'40px' }}
          >
            Approval of the request
          </Button>
          <Button
            type="submit"
            onClick={() => setSubmitType(2)}
            sx={{ border: "1px solid #0E4C8F", minWidth: "214px"  , width:'214px' }}
          >
            Identity preview
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default MedicalForm;
