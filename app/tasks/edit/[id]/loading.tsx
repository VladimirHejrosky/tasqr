import { Backdrop, CircularProgress } from "@mui/material";

const LoadingEditTaskPage = () => {
  return (
    <Backdrop open={true}>
    <CircularProgress color="inherit" />
  </Backdrop>
  );
};

export default LoadingEditTaskPage;
