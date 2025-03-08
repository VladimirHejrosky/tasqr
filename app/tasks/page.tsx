import React from 'react'
import TaskCard, { Task } from './components/TaskCard'
import { Box, Container, Divider, Typography } from '@mui/material'
import TabPanel, { PossibleTaskQueries } from './components/TabPanel'

interface Props {
  searchParams:Promise<{status: PossibleTaskQueries}>
}

const TasksPage = async ({searchParams}: Props) => {
  const query = await searchParams

  const tasks: Task[] = [
    { id: "1", label: "Posekat trávník", done: false, priority: 2, repeat: "monthly" },
    { id: "2", label: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, mollitia.", done: false, priority: 2, repeat: "weekly" },
    { id: "3", label: "Koupit pivo", done: true, priority: 1, repeat: "daily" },
    { id: "4", label: "Opravit auto", done: false, priority: 2, repeat: "daily" }
  ]

  const filteredTasks = tasks
    .filter(task => {
      switch (query.status) {
        default:
        case "active":
          return !task.done;
        case "completed":
          return task.done;
        case "repeated":
          return task.repeat !== "none";          
      }
    })
    query.status !== "completed" && query.status !== "repeated" && filteredTasks.sort((a, b) => a.priority - b.priority); 

  return (
    <Container>
        <TabPanel query={query.status}/>

      { query.status !== "completed" && query.status !== "repeated" &&  <Box marginTop={2} textAlign={"center"}>
        {filteredTasks.length > 0 ? filteredTasks.map(task => <TaskCard key={task.id} task={task}/>) : <Typography variant="h6">Nemáš žádné úkoly na splnění</Typography>} 
      </Box>}

      { query.status === "completed" && <Box marginTop={2} textAlign={"center"}>
        {filteredTasks.length > 0 ? filteredTasks.map(task => <TaskCard key={task.id} task={task}/>) : <Typography variant="h6">Nemáš dokončené žádné úkoly</Typography>} 
      </Box>}

      {query.status === "repeated" && (
        <Box marginTop={2} textAlign="center">
          {/* Daily Tasks */}
          { filteredTasks.filter(task => task.repeat === "daily").length > 0 && <Divider sx={{mb:2}}>Denní úkoly</Divider>}
          {filteredTasks.filter(task => task.repeat === "daily").length > 0 && (
            filteredTasks
              .filter(task => task.repeat === "daily")
              .map(task => <TaskCard key={task.id} task={task} />)
          ) }

          {/* Weekly Tasks */}
          { filteredTasks.filter(task => task.repeat === "weekly").length > 0 && <Divider sx={{mb:2}}>Týdenní úkoly</Divider>}
          {filteredTasks.filter(task => task.repeat === "weekly").length > 0 && (
            filteredTasks
              .filter(task => task.repeat === "weekly")
              .map(task => <TaskCard key={task.id} task={task} />)
          )}

          {/* Monthly Tasks */}
          
          { filteredTasks.filter(task => task.repeat === "monthly").length > 0 && <Divider sx={{mb:2}}>Mesíční úkoly</Divider>}
          {filteredTasks.filter(task => task.repeat === "monthly").length > 0 && (
            filteredTasks
              .filter(task => task.repeat === "monthly")
              .map(task => <TaskCard key={task.id} task={task} />)
          )}

          {filteredTasks.length === 0 && <Typography variant="h6">Nemáš žádné opakující se úkoly</Typography>}  
        </Box>
      ) }

    </Container>
  )
}

export default TasksPage