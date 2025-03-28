import { Container, Skeleton, Stack } from "@mui/material";

const LoadingHomePage = () => {
  return (
    <Container maxWidth="sm">
      <Stack spacing={2} my={2}>
        <Skeleton variant="rectangular" width="100%" height={50} />
        <Skeleton variant="rectangular" width="100%" height={50} />
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Stack>
    </Container>
  );
};

export default LoadingHomePage;
