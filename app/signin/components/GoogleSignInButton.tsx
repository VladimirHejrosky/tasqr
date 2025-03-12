"use client"
import { Button } from '@mui/material'
import { signIn } from "next-auth/react";

const GoogleSignInButton = () => {
  return (
    <Button variant='outlined' onClick={() => signIn("google", { callbackUrl: "/" })}>
        Přihlášení přes Google
    </Button>
  )
}

export default GoogleSignInButton