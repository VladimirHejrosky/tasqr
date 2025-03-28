import { Container, Skeleton, Stack } from "@mui/material";

const FormSkeleton = () => {
  return (
    <Container maxWidth="sm">
      <Stack spacing={2} my={2}>
        <Skeleton width="40%" height={20} sx={{ alignSelf: "center" }} />
        <Skeleton width="100%" height={80} />
        <Skeleton width="100%" height={80} />
        <Skeleton width="100%" height={80} />
        <Stack justifyContent={"space-between"} direction="row">
          <Skeleton width="20%" height={60} />
          <Skeleton width="20%" height={60} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default FormSkeleton;
