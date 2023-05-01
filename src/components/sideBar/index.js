import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Drawer } from "./style";
import { Collapse, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Images, sideBarItem } from "../../assets";
import { useState } from "react";
import '../../index.css'
export const ExpandableSideBarItem = ({ openSide, item, navigate,active, setActive }) => {
  const [openChildren, setOpenChildren] = useState(false);
  // const [active, setActive] = useState(null);

  return (
    <>
      <ListItem
        key={item.id}
        disablePadding
        sx={{ display: "block" }}
        onClick={() => setOpenChildren(!openChildren)}
      >
        <ListItemButton
        
          sx={{
            minHeight: 48,
            justifyContent: openSide ? "initial" : "start ",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: openSide ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <img src={item.icon} alt="icon" />
          </ListItemIcon>

          <ListItemText
            primary={item.name}
            sx={{ opacity: openSide ? 1 : 0, color: "#4E4D4D" }}
          />
          <ListItemIcon sx={{ opacity: openSide ? 1 : 0 }}>
            {openChildren ? (
              <KeyboardArrowUpIcon sx={{ fill: "#FFF" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ fill: "#FFF" }} />
            )}
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      {openSide ? (
        <Collapse in={openChildren} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.children.map((item) => (
              <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
                <ListItemButton className={`list-item ${active == item && "active"}`}
                  sx={{
                    justifyContent: openSide ? "initial" : "center",
                    px: 10,
                   
                  }}
                  onClick={() => navigate(item.path)&  setActive(item) } >
                  <ListItemText className="listItem-text"
                    primary={item.name}
                    sx={{ opacity: openSide ? 1 : 0, color: "#4E4D4D" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
};
export const SideBarItem = ({ openSide, menuItems, label, navigate , active , setActive }) => (
  <Stack>
    

    {menuItems.map((item) => {
      return item.children ? (
        <ExpandableSideBarItem
          key={item.id}
          openSide={openSide}
          navigate={navigate}
          item={item}
          active={active}
          setActive ={setActive}
        />
      ) : (
        <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
          <ListItemButton className={`list-item ${active == item && "active"}`}
            sx={{
              minHeight: 48,
              justifyContent: openSide ? "initial" : "center",
              px: 2.5,
              
            }}
            onClick={() => navigate(item.path)&  setActive(item)}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: openSide ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <img src={item.icon} alt="icon" />
            </ListItemIcon>
            <ListItemText className="listItem-text"
              primary={item.name}
              sx={{ opacity: openSide ? 1 : 0, color: "#4E4D4D" }}
            />
          </ListItemButton>
        </ListItem>
      );
    })}
  </Stack>
);

const SideBar = ({ open }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  return (
    <Drawer variant="permanent" open={open}>
      <Divider />
      <Stack
        sx={{
          display: open ? "visible" : "none"
        }}
        alignItems={"center"}
        margin={"10px 0 40px"}
        padding="10px 0"
      >
        <img width={"203px"} height={"217px"} src={Images.logo} alt="logo" />
      </Stack>

      <SideBarItem
        navigate={navigate}
        menuItems={sideBarItem}
        label={"Medical File"}
        openSide={open}
        active={active}

        setActive={setActive}
   
      />
    </Drawer>
  );
};

export default SideBar;
