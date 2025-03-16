import TabPanel from "./components/TabPanel";
import { Container } from "@mui/material";
import TasksList from "./components/TasksList";
import AddTaskButton from "./components/AddTaskButton";

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