"use client"; 

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TaskCard, { Task } from "./TaskCard";
import { Box, Divider, Typography } from "@mui/material";

const fetchTasks = async (status: string): Promise<Task[]> => {
  const { data } = await axios.get(`/api/tasks?status=${status}`);
  return data;
};

interface Props {
   status: "active" | "completed" | "repeated" 
}
const TasksList = ({status}: Props) => {

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ["tasks", status],
    queryFn: () => fetchTasks(status),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading tasks</Typography>;

  return (
    <Box marginTop={2} textAlign="center">
      {/* Regular tasks */}
      {status !== "repeated" &&
        (tasks.length > 0 ? (
          tasks.map(task => <TaskCard key={task.id} task={task} />)
        ) : (
          <Typography variant="h6">
            {status === "completed" ? "Nemáš dokončené žádné úkoly" : "Nemáš žádné úkoly na splnění"}
          </Typography>
        ))}

      {/* Repeated Tasks */}
      {status === "repeated" && (
        <>
          {["daily", "weekly", "monthly"].map(repeatType => {
            const repeatedTasks = tasks.filter(task => task.repeat === repeatType);
            return repeatedTasks.length > 0 ? (
              <Box key={repeatType} marginBottom={2}>
                <Divider sx={{ mb: 2 }}>
                  {repeatType === "daily" ? "Denní úkoly" : repeatType === "weekly" ? "Týdenní úkoly" : "Měsíční úkoly"}
                </Divider>
                {repeatedTasks.map(task => <TaskCard key={task.id} task={task} />)}
              </Box>
            ) : null;
          })}
          {tasks.length === 0 && <Typography variant="h6">Nemáš žádné opakující se úkoly</Typography>}
        </>
      )}
    </Box>
  );
};

export default TasksList;
