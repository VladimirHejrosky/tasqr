"use client"
import { Button } from '@mui/material';
import { signIn } from "next-auth/react";

const GoogleSignInButton = () => {
  return (
    <Button sx={{textWrap: "nowrap" }} variant='outlined' onClick={() => signIn("google", { callbackUrl: "/" })}>
        Přihlásit přes Google
    </Button>
  )
}

export default GoogleSignInButton