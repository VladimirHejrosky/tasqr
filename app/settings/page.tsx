import { Container, Divider } from '@mui/material'
import React from 'react'
import UserBar from './components/UserBar'
import ThemeSelector from './components/ThemeSelector'

const SettingsPage = () => {
  return (
    <Container sx={{maxWidth: {lg: "600px"}}}>
      <Divider sx={{paddingY:".5rem"}}>Účet</Divider>
      <UserBar />
      <Divider sx={{paddingY:".5rem"}}>Téma</Divider>
      <ThemeSelector />
    </Container>
  )
}

export default SettingsPage