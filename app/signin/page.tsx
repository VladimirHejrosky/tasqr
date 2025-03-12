import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Box, Card, CardActions, CardContent, Container } from "@mui/material";
import GoogleSignInButton from "./components/GoogleSignInButton";
import GoogleIcon from "@mui/icons-material/Google";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <Container>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"calc(100vh - 128px)"}>
        <Card sx={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", width:"fit-content"}}>
          <CardContent>
            <GoogleIcon />
          </CardContent>
          <CardActions>
            <GoogleSignInButton />
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}
