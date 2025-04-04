"use client"
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { useRouter } from "next/navigation";

const AddTaskButton = () => {
  const router = useRouter()
  return (
    <Fab
      onClick={() => router.push("/tasks/new")}
      color="primary" sx={{
      position: "fixed",
      left: 10,
      bottom: 80,
      opacity: ".9",
      display: {xs: "block", lg: "none"},
      boxShadow: "0 0 5px var(--mui-palette-common-onBackground)", 
      "@keyframes glowing": {
        "0%": {
          boxShadow: "0 0 5px var(--mui-palette-common-onBackground)", 
        },
        "50%": {
          boxShadow: "0 0 10px var(--mui-palette-common-onBackground)", 
        },
        "100%": {
          boxShadow: "0 0 5px var(--mui-palette-common-onBackground)", 
        },
      },
      animation: "glowing 1.5s infinite", 
    }}>
      <AddIcon />
    </Fab>
  );
};

export default AddTaskButton;
