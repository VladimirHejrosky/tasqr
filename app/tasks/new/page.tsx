"use client";
import {
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
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface formInputs {
  label: string;
  repeat: string;
  priority: number;
}

const NewTaskPage = () => {
  const { register, control, handleSubmit } = useForm<formInputs>({
    defaultValues: {
      label: "",
      priority: 1,
      repeat: "none",
    },
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, formInputs>({
    mutationFn: async (newTask) => {
      return await axios.post("/api/tasks", newTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      return router.push("/tasks");
    },
  });

  return (
    <Container maxWidth="sm">
      <Box display={"flex"} justifyContent={"center"} my={3}>
      {mutation.isError ? <Typography color="error">Chyba při vytváření úkolu</Typography> : 
      <Typography>Vytvoření nového úkolu</Typography>}
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
            size="medium"
            required
            variant="outlined"
            label="Popis"
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
          <Button
            disabled={mutation.isPending}
            type="submit"
            size="large"
            color="success"
            variant="contained"
          >
            Vytvořit
            {mutation.isPending && (
              <CircularProgress color="inherit" size={"1rem"} />
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewTaskPage;
