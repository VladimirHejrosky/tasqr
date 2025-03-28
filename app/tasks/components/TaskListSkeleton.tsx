import { Stack, Skeleton } from "@mui/material"

const TasksListSkeleton = () => {
  return (
      <Stack spacing={2} my={2}>
        <Skeleton variant="rectangular" width="100%" height={30} />
        <Skeleton variant="rectangular" width="100%" height={30} />
        <Skeleton variant="rectangular" width="100%" height={30} />
        <Skeleton variant="rectangular" width="100%" height={30} />
        <Skeleton variant="rectangular" width="100%" height={30} />
      </Stack>
  )
}



export default TasksListSkeleton