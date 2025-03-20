import { Box, Button, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import DoneIcon from "@mui/icons-material/Done";
import { BiTaskX } from "react-icons/bi";
import { BiTask } from "react-icons/bi";
import { Task } from "@prisma/client";
import DeleteButton from "./DeleteTaskButton";
import EditTaskButton from "./ToggleTaskButton";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <Box display={"flex"} alignItems={"center"} mb={2}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          borderRadius: 1,
          bgcolor: task.done
            ? "var(--mui-palette-success-light)"
            : "var(--mui-palette-Alert-infoFilledBg)",
          p: 2,
          width: "100%"
        }}
      >
        {task.done ? (
          <BiTask size={28} />
        ) : (
          <BiTaskX size={24} className="mr-4" />
        )}
        <Typography ml={2}>{task.label}</Typography>
      </Box>

      <Box display={"flex"} gap={2} ml={2}>
      <DeleteButton id={task.id}/>
      <EditTaskButton id={task.id} done={task.done} />
      </Box>
    </Box>
  );
};
export default TaskCard;
