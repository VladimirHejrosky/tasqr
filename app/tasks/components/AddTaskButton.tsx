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
        borderRadius: "100%"
      }}>
      <IconButton>
        <AddIcon fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default AddTaskButton;
