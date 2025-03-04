import { AddBox } from '@mui/icons-material'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

const MainHeader = () => {
  return (
    <Box justifyContent={"center"}>
    <AppBar position="static">
      <Toolbar>
        <Typography fontWeight={700} variant='h4' component="div" sx={{ flexGrow: 1 }}>
          tasqr
        </Typography>
        <Button color="inherit"><AddBox /></Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default MainHeader