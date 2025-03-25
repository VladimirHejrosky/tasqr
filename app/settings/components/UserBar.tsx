"use client"
import { Box, Button, Skeleton, Typography } from "@mui/material"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const UserBar = () => {
  
    const { status, data: session} = useSession()
    const router = useRouter()

    const handleSignOut = async () => {
      await signOut({ redirect: false })
      router.push("/signin")
    };

  return (
    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        {status === "loading" ? <Skeleton width={"100px"}/> : <Typography>{session?.user?.name}</Typography>}
        <Button onClick={handleSignOut}>Odhlásit</Button>
    </Box>
  )
}

export default UserBar