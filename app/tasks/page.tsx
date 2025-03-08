import React from 'react'
import TaskCard, { Task } from './components/TaskCard'
import { Box, Container, Divider, Typography } from '@mui/material'

const TasksPage = () => {

  const tasks: Task[] = [
    { id: "1", label: "Posekat trávník", done: false, priority: 1 },
    { id: "2", label: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, mollitia.", done: true, priority: 2 },
    { id: "3", label: "Koupit pivo", done: false, priority: 3 },
    { id: "4", label: "Opravit auto", done: true, priority: 2 }
  ]

  tasks.sort((a, b) => a.priority - b.priority)

  return (
    <Container>
      <Box>
      <Divider sx={{marginBottom: "1rem"}}><Typography color='var(--mui-palette-Alert-successFilledBg)'>Aktivní</Typography></Divider>
        {tasks.map(task => task.done === false && <TaskCard key={task.id} task={task} />)}
        <Divider sx={{marginBottom: "1rem"}}><Typography color='var(--mui-palette-Alert-errorFilledBg)'>Dokončené</Typography></Divider>
        {tasks.map(task => task.done === true && <TaskCard key={task.id} task={task} />)}
      </Box>
    </Container>
  )
}

export default TasksPage