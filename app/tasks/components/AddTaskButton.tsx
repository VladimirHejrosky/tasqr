"use client"
import { IconButton, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

const AddTaskButton = () => {
  return (
    <Paper elevation={3} variant="outlined" sx={{
        position: "fixed",
        left: 5,
        bottom: 65,
        opacity: ".8",
        borderRadius: "100%",
        display: {xs: "block", lg: "none"},
        boxShadow: "0 0 5px var(--mui-palette-common-onBackground)", 
        "@keyframes glowing": {
          "0%": {
            boxShadow: "0 0 5px var(--mui-palette-common-onBackground)", 
          },
          "50%": {
            boxShadow: "0 0 15px var(--mui-palette-common-onBackground)", 
          },
          "100%": {
            boxShadow: "0 0 5px var(--mui-palette-common-onBackground)", 
          },
        },
        animation: "glowing 1.5s infinite", 
      }}>
      <IconButton>
        <AddIcon fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default AddTaskButton;
