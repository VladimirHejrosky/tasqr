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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleUpdate = () => {
    const updatedData = {
      done: !done,
    };
    mutation.mutate(updatedData);
  };

  return (
    <>
      {done ? (
        <ReplayIcon
          onClick={handleUpdate}
          color="secondary"
          fontSize="medium"
          sx={{ cursor: "pointer" }}
        />
      ) : (
        <DoneIcon
          onClick={handleUpdate}
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
