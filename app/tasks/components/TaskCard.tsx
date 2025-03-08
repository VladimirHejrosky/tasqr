"use client"
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import ReplayIcon from '@mui/icons-material/Replay'
import DoneIcon from '@mui/icons-material/Done'
import DeleteIcon from '@mui/icons-material/Delete';

export interface Task {
  id: string;
  label: string;
  done: boolean;
  priority: number;
}

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
      bgcolor: task.done ? "var(--mui-palette-grey-500)" : "var(--mui-palette-Alert-infoFilledBg)",
      p: 2,
      mb: 2,
      cursor: "pointer",
    }}
    onClick={() => setShowOverlay(true)}
  >
    <TaskAltIcon sx={{marginRight: 2}}/>
    <Typography>{task.label}</Typography>

    {showOverlay && (
      <Box
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
          justifyContent: "space-around",
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
