import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardHeader, IconButton } from "@mui/material";
import { dashboardItem } from "../../assets";

export default function BasicCard({ Icon, title, counter }) {
  return (
    // <Card sx={{ minWidth: 210, height: "190px", boxShadow: "none" }}>
    //   <CardContent>
    //     <Box
    //       sx={{
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         padding: "30px",
    //         gap: "20px",
    //       }}
    //     >
    //       {Icon}
    //       <Typography
    //         fontSize={"13px"}
    //         fontWeight={600}
    //         color="#0E4C8F"
    //         gutterBottom
    //       >
    //         {title}
    //       </Typography>
    //       <Typography
    //         fontSize={"13px"}
    //         fontWeight={600}
    //         color="#6CA3DE"
    //         gutterBottom
    //       >
    //         {counter}
    //       </Typography>
    //     </Box>
    //   </CardContent>
    // </Card>
    <Card sx={{ minWidth: 316, height: "153px" }}>
     
           
    <CardContent>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          padding: "15px 10px",
          gap: "20px",
        }}
      >
        <Typography
          fontSize={"14px"}
          fontWeight={400}
          color="#4E4D4D"
          gutterBottom
          sx={{fontWeight:'regular'}}
        >
          {title}
        </Typography>
        {/* <hr style={{borderColor:'#EFEFEF'}}/> */}
        <Typography
          fontSize={"40px"}
          fontWeight={600}
          color="#0E0E0E"
          gutterBottom
        >
          {counter}
        </Typography>
        
      
      </Box>
    </CardContent>
  </Card>
  );
}
