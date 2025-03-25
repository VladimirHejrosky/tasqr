import { Box } from "@mui/material";
import { Task } from "@prisma/client";
import { BiTask } from "react-icons/bi";
import TaskLabel from "./TaskLabel";
import ToggleTaskButton from "./ToggleTaskButton";

interface Props {
  task: Task;
  displayAsRepeat?: boolean;
}

const TaskCard = ({ task, displayAsRepeat }: Props) => {
  return (
    <Box display={"flex"} alignItems={"center"} mb={2}>
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          borderRadius: 1,
          bgcolor: theme.palette.mode === "dark" ? "#415a77" : "#8ecae6",
          p: 1,
          width: "100%",
        })}
      >
        <BiTask size={24} className="shrink-0" />
        <TaskLabel id={task.id} label={task.label} />

        <Box display={"flex"} gap={1} ml={2} flexShrink={0}>
          {!displayAsRepeat && (
            <ToggleTaskButton id={task.id} done={task.done} />
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default TaskCard;
