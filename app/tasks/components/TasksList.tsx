"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TaskCard from "./TaskCard";
import { Box, Divider, Typography } from "@mui/material";
import { Task } from "@prisma/client";

const fetchTasks = async (status: string): Promise<Task[]> => {
  const { data } = await axios.get(`/api/tasks?status=${status}`);
  return data;
};

interface Props {
  status: "active" | "completed" | "repeated";
}
const TasksList = ({ status }: Props) => {
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", status],
    queryFn: () => fetchTasks(status),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading tasks</Typography>;

  return (
    <Box marginTop={2} textAlign="center">
      {/* Regular tasks */}
      {status == "active" &&
        (tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <Typography variant="h6">"Nemáš žádné úkoly na splnění"</Typography>
        ))}

      {/* Completed tasks */}
      {status === "completed" &&
        (tasks.length > 0 ? (
          <>
            <Divider sx={{mb: 2}}>Poslední dokončené</Divider>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </>
        ) : (
          <Typography variant="h6">"Nemáš žádné dokončené úkoly"</Typography>
        ))}

      {/* Repeated Tasks */}
      {status === "repeated" && (
        <>
          {["daily", "weekly", "monthly"].map((repeatType) => {
            const repeatedTasks = tasks.filter(
              (task) => task.repeat === repeatType
            );
            return repeatedTasks.length > 0 ? (
              <Box key={repeatType} marginBottom={2}>
                <Divider sx={{ mb: 2 }}>
                  {repeatType === "daily"
                    ? "Denní úkoly"
                    : repeatType === "weekly"
                    ? "Týdenní úkoly"
                    : "Měsíční úkoly"}
                </Divider>
                {repeatedTasks.map((task) => (
                  <TaskCard key={task.id} task={task} displayAsRepeat={true} />
                ))}
              </Box>
            ) : null;
          })}
          {tasks.length === 0 && (
            <Typography variant="h6">Nemáš žádné opakované úkoly</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default TasksList;
