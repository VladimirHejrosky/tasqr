"use client"
import { Box, Button, Skeleton, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import Link from "next/link"

const UserBar = () => {
    const { status, data: session} = useSession()
  return (
    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        {status === "loading" ? <Skeleton width={"100px"}/> : <Typography>{session?.user?.name}</Typography>}
        <Button><Link href={"/api/auth/signout"}>Odhlásit</Link></Button>
    </Box>
  )
}

export default UserBar