import { Container, Box, Typography, Button } from '@mui/material'
import {useRouter} from 'next/navigation'
import React from 'react'

const TaskNotFound = () => {
    const router = useRouter()
  return (
    <Container maxWidth="sm">
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      my={3}
      flexDirection={"column"}
    >
      <Typography mb={2} fontSize={"2rem"} textAlign={"center"}>
        Úkol nenalezen
      </Typography>
      <Button
        sx={{ width: "max-content" }}
        size="large"
        color="error"
        variant="outlined"
        onClick={() => router.back()}
      >
        Zpět
      </Button>
    </Box>
  </Container>
  )
}

export default TaskNotFound