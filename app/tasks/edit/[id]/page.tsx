"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import EditForm from "./components/EditForm";
import TaskNotFound from "./components/TaskNotFound";

const fetchTask = async (id: string) => {
  const { data } = await axios.get(`/api/tasks/${id}`);
  return data;
};

const EditTaskPage = () => {
  const { id } = useParams();

  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => fetchTask(id as string),
    enabled: !!id,
    retry: false
  });

    
  if (isLoading) return <div>loading</div>

  if (!task || error) return <TaskNotFound />

  return (
     <EditForm task={task} />
  );
};

export default EditTaskPage;
