"use client";
import { newTaskSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Repeat } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import DeleteTaskButton from "./DeleteTaskButton";

type formInputs = z.infer<typeof newTaskSchema>;

interface Props {
  task: { id: number; label: string; priority: number; repeat: Repeat };
}

const EditForm = ({task}: Props) => {
    const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formInputs>({
    defaultValues: {
      label: task.label,
      priority: task.priority,
      repeat: task.repeat,
    },
    resolver: zodResolver(newTaskSchema),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, formInputs>({
    mutationFn: async (updatedData) => {
      return await axios.patch(`/api/tasks/${task.id}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      return router.push("/tasks");
    },
  });

  return (
    <Container maxWidth="sm">
      <Box display={"flex"} justifyContent={"center"} my={3}>
        {mutation.isError ? (
          <Typography color="error">Chyba při editaci úkolu</Typography>
        ) : (
          <Typography>Editace úkolu</Typography>
        )}
      </Box>
      <Box
        component={"form"}
        display={"flex"}
        flexDirection={"column"}
        gap={5}
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
      >
        <FormControl fullWidth>
          <TextField
            focused={true}
            error={!!errors.label}
            helperText={errors.label?.message || ""}
            size="medium"
            variant="outlined"
            label="Název"
            {...register("label")}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="priority-label">Priorita</InputLabel>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Priorita" labelId="priority-label">
                <MenuItem value={0}>Nízká</MenuItem>
                <MenuItem value={1}>Normální</MenuItem>
                <MenuItem value={2}>Vysoká</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="repeat-label">Opakovat</InputLabel>
          <Controller
            name="repeat"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Opakovat" labelId="repeat-label">
                <MenuItem value="none">Neopakovat</MenuItem>
                <MenuItem value="daily">Denně</MenuItem>
                <MenuItem value="weekly">Týdně</MenuItem>
                <MenuItem value="monthly">Měsíčně</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <Box display={"flex"} justifyContent={"space-between"}>
          <Button
            disabled={mutation.isPending}
            size="large"
            color="error"
            variant="outlined"
            onClick={() => router.back()}
          >
            Zrušit
          </Button>
          <DeleteTaskButton id={task.id}/>
          <Button
            disabled={mutation.isPending}
            type="submit"
            size="large"
            color="success"
            variant="contained"
          >
            Uložit
          </Button>
        </Box>
      </Box>
      <Backdrop open={mutation.isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default EditForm;
