import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

const ShoppingPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography textAlign={"center"} mb={1} variant="h4">Připravuje se.</Typography>
    <Box sx={{ position: "relative", width: "100%", height: "60vh" }}>
      <Image
        src="/images/UnderConstruction.webp"
        alt="Under Construction"
        layout="fill"
        objectFit="cover"
      />
    </Box>
    </Container>
  );
};

export default ShoppingPage;
