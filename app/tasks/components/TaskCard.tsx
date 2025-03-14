"use client"
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ReplayIcon from '@mui/icons-material/Replay'
import DoneIcon from '@mui/icons-material/Done'
import DeleteIcon from '@mui/icons-material/Delete';
import { BiTaskX } from "react-icons/bi";
import { BiTask } from "react-icons/bi";
import { Task } from "@prisma/client";

const TaskCard = ({ task }: { task: Task }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        setShowOverlay(false);
      }
    };

    if (showOverlay) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOverlay]);

  return (
    <Box
    sx={{
      display: "flex",
      alignItems: "center",
      position: "relative",
      borderRadius: 1,
      bgcolor: task.done ? "var(--mui-palette-success-light)" : "var(--mui-palette-Alert-infoFilledBg)",
      p: 2,
      mb: 2,
      cursor: "pointer",
      marginX: "auto",
    }}
    onClick={() => setShowOverlay(true)}
  >
    {task.done ? <BiTask size={28}/> : <BiTaskX size={24} className="mr-4" />}
    <Typography ml={2}>{task.label}</Typography>

    {showOverlay && (
      <Box 
        gap={2}
        pr={2}
        ref={overlayRef}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.5)",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          
        }}
      >
        <Button variant="contained" color="error">
          <DeleteIcon />
        </Button>
        {task.done ? 
        <Button variant="contained">
          <ReplayIcon />
        </Button>
        :
        <Button variant="contained" color="success">
          <DoneIcon />
        </Button>
}
      </Box>
    )}
  </Box>
  );
};
export default TaskCard;
