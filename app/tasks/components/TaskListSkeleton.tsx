import { Stack, Skeleton } from "@mui/material"

const TasksListSkeleton = () => {
  return (
      <Stack spacing={2} my={2}>
        <Skeleton width="20%" height={20} sx={{alignSelf: "center"}} />
        <Skeleton width="100%" height={30} />
        <Skeleton width="100%" height={30} />
        <Skeleton width="100%" height={30} />
        <Skeleton width="100%" height={30} />
        <Skeleton width="100%" height={30} />
      </Stack>
  )
}

export default TasksListSkeleton