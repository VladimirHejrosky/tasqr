"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  id: number;
}

export default function AlertDialog({ id }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      router.back();
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    await mutation.mutateAsync();
    handleClose();
  };

  return (
    <>
      <DeleteIcon
        sx={{ cursor: "pointer" }}
        fontSize="large"
        color="error"
        onClick={handleClickOpen}
      />

      <Dialog id="delete-dialog" open={open} onClose={handleClose}>
        <DialogTitle>{"Potvrdit"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Opravdu chcete odstranit úkol?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zpět</Button>
          <Button
            disabled={mutation.isPending}
            color="error"
            variant="contained"
            onClick={handleDelete}
            autoFocus
          >
            Smazat
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop open={mutation.isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
