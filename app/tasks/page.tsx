import { Container } from "@mui/material";
import AddTaskButton from "./components/AddTaskButton";
import TabPanel from "./components/TabPanel";
import TasksList from "./components/TasksList";

interface Props {
  searchParams: Promise<{ status: "active" | "completed" | "repeated" }>;
}

const TasksPage = async ({ searchParams }: Props) => {
  const { status } = await searchParams

  const checkedstatus = status!== "completed" && status !== "repeated" ? "active" : status
  
  return (
    <Container maxWidth="sm">
      <TabPanel status={checkedstatus} />
      <TasksList status={checkedstatus}/>
      <AddTaskButton />
    </Container>
  );
};

export default TasksPage;