"use client"
import ReplayIcon from "@mui/icons-material/Replay";
import DoneIcon from "@mui/icons-material/Done";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Props {
    id: number,
    done: boolean
}

const EditTaskButton = ({id, done}: Props) => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async () => {
            return await axios.patch(`api/tasks/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tasks"]})
        }
    })

    const handleUpdate = () => mutation.mutate()

  return (
    <>
    {done ? (
        <ReplayIcon onClick={handleUpdate} fontSize="large" sx={{cursor:"pointer"}}/>
    ) : (
        <DoneIcon onClick={handleUpdate} color="success" fontSize="large"sx={{cursor:"pointer"}}/>
    )}
    </>
  )
}

export default EditTaskButton