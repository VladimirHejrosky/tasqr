import { Box, Button, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import DoneIcon from "@mui/icons-material/Done";
import { BiTaskX } from "react-icons/bi";
import { BiTask } from "react-icons/bi";
import { Task } from "@prisma/client";
import DeleteButton from "./DeleteTaskButton";
import ToggleTaskButton from "./ToggleTaskButton";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";

interface Props {
  task: Task;
  displayAsRepeat?: boolean;
}

const TaskCard = ({ task, displayAsRepeat }: Props) => {
  return (
    <Box display={"flex"} alignItems={"center"} mb={2}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: 1,
          bgcolor: displayAsRepeat
            ? "var(--mui-palette-grey-600)"
            : task.done
            ? "var(--mui-palette-success-light)"
            : "var(--mui-palette-Alert-infoFilledBg)",
          p: 1,
          width: "100%"
        }}
      >
        {task.done ? (
          <BiTask size={24} className="shrink-0"/>
        ) : (
          <BiTaskX size={24} className="shrink-0"/>
        )}
        <Typography flex={1} textAlign={"left"} ml={1}>{task.label}</Typography>

      <Box display={"flex"} gap={1} ml={2} flexShrink={0}>
        {displayAsRepeat ? (
        <DeleteButton id={task.id} />
        ) : (
          <ToggleTaskButton id={task.id} done={task.done} />
        )}
        </Box>
      </Box>
    </Box>
  );
};
export default TaskCard;
