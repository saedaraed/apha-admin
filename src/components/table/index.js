import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Pagination, Skeleton, Stack, styled } from "@mui/material";
import { getRows } from "./getRows";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../../index.css"
export default function BasicTable({ rows, columns, invoice }) {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const isLoading = useSelector((state) => state.adminData.isLoading);

  const pagi = [];
  for (let i = 0; i < Math.ceil(rows.length / pageSize); i++) {
    pagi.push(i);
    console.log(pagi);
  }
  const sliceDat = () => {
    return rows.slice((page - 1) * pageSize, page * pageSize);
  };
const pagination = pagi.length;
const handleClick = (num) => {
  setPage(num);
};
  const StyledTable = styled(DataGrid)(({ theme }) => ({
    border: "none",
    minHeight: invoice ? "40vh" : "72vh",
    color: "#0A0A0A",
    fontWeight: 500,
    fontSize: "0.9rem",
    // width: "auto",
    "& .paxton-table--row": {
      border: "solid 1px #0A0A0A1A",
      marginTop: "15px",
      marginBottom: "15px",
      backgroundColor: "#fff",
      borderRadius:'5px', 

    },
    "& .paxton-table--cell": {
      border: "none",
      color:'red'
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#F5F5F5",
      width: "200vh",
      minwidth: "100vw",
      borderBottom:'none',
      borderRadius:'5px'
    },
    "& .MuiDataGrid-footerContainer": {
      display: invoice ? "none" : "",
      backgroundColor: "#fff",
    },
    "& .css-1q8b1ey-MuiDataGrid-root .paxton-table--row" :{
      // borderBottom:'none'
    },
    "& .css-1w5m2wr-MuiDataGrid-virtualScroller" :{
    // padding:'0px 20px'
    }
  }));
  const LoadingSkeleton = () => (
    <Box
      sx={{
        height: "max-content",
        width: "100%",
      }}
    >
      {[...Array(10)].map((_, index) => (
        <Skeleton key={index} variant="rectangular" sx={{ my: 4, mx: 1 }} />
      ))}
    </Box>
  );

  if (!isLoading) {
    return (
      <Stack
        width={"100%"}
        sx={{
          backgroundColor: "",
          boxShadow: "none",
          margin:'0 10px'
        }}
        component={Paper}
      >
        <StyledTable
          rows={getRows(rows)}
          columns={columns}
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        
          
          pagination
          disableSelectionOnClick
          getRowClassName={() => "paxton-table--row"}
        />
        {/* <Pagination count={pagination} shape="rounded"  page={page} onChange={(newPage) => setPage(newPage)}/> */}
        {/* <Stack sx={{display:'flex' , flexDirection:'row'}}>
              {pagi.map((numb, index) => (
          <button value={page} onClick={() => handleClick(numb)}>
          {numb}{" "}
          </button>
      ))}
      </Stack> */}
      </Stack>
    );
  } else {
    return <LoadingSkeleton />;
  }
}
