import { Container, Divider } from '@mui/material'
import ThemeSelector from './components/ThemeSelector'
import UserBar from './components/UserBar'

const SettingsPage = () => {
  return (
    <Container maxWidth="sm">
      <Divider sx={{paddingY:".5rem"}}>Účet</Divider>
      <UserBar />
      <Divider sx={{paddingY:".5rem"}}>Téma</Divider>
      <ThemeSelector />
    </Container>
  )
}

export default SettingsPage