import { Backdrop, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
      <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
    );
};

export default Loading;
