"use client"
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
    id: number
    label: string
}

const TaskLabel = ({id, label}: Props) => {
    const router = useRouter()
  return (
    <Box width={"100%"} sx={{cursor: "pointer"}} onClick={() => router.push(`tasks/edit/${id}`)}>
      <Typography flex={1} textAlign={"left"} ml={1}>
        {label}
      </Typography>
    </Box>
  );
};

export default TaskLabel;
