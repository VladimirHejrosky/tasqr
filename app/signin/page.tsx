import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import GoogleSignInButton from "./components/GoogleSignInButton";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #415a77, #778da9)",
        height: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <Box
          display={"flex"}
          gap={2}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          p={3}
        >
          <Card sx={{ width: "100%"}}>
            <CardContent>
              <Typography textAlign={"center"} variant="h3" fontWeight={"bold"}>
                TASQR.beta
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ padding: ".5rem", alignSelf: "flex-end" }}>
            <CardContent>
              <Typography textAlign={"end"}>Spravuj své úkoly</Typography>
              <Typography textAlign={"end"}>Dokončuj úkoly</Typography>
              <Typography textAlign={"end"}>Buď produktivní</Typography>
            </CardContent>
          </Card>
          <Card sx={{padding: ".5rem", alignSelf: "flex-start" }}>
            <CardContent>
              <Typography>Připravuje se:</Typography>
              <Typography>Nákupní seznam</Typography>
              <Typography>Připomenutí seznamu v obchodě</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "fit-content",
              padding: ".5rem",
              marginTop: "2rem"
            }}
          >
            <Typography>Přihlášení</Typography>
            <CardContent>
              <GoogleIcon />
            </CardContent>
            <CardActions>
              <GoogleSignInButton />
            </CardActions>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
