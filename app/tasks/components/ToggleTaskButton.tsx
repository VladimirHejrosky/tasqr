"use client";
import DoneIcon from "@mui/icons-material/Done";
import ReplayIcon from "@mui/icons-material/Replay";
import { Backdrop, CircularProgress } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  id: number;
  done: boolean;
}

const ToggleTaskButton = ({ id, done }: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (updatedData: { done: boolean }) => {
      return await axios.patch(`api/tasks/${id}`, updatedData);
    },
    onMutate: async (updatedData) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old: any) =>
        old?.map((task: any) =>
          task.id === id ? { ...task, done: updatedData.done } : task
        )
      );

      return { previousTasks };
    },
    onError: (_err, _newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <>
      {done ? (
        <ReplayIcon
        onClick={() => mutation.mutate({ done: false })}
          color="secondary"
          fontSize="medium"
          sx={{ cursor: "pointer" }}
        />
      ) : (
        <DoneIcon
        onClick={() => mutation.mutate({ done: true })}
          color="success"
          fontSize="medium"
          sx={{ cursor: "pointer" }}
        />
      )}
      <Backdrop open={mutation.isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ToggleTaskButton;
