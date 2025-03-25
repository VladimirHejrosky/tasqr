"use client"
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, useColorScheme } from "@mui/material"


const ThemeSelector = () => {
    const { mode, setMode} = useColorScheme()
    if (!mode) return null

  return (
    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <FormControl fullWidth={true}>
        <RadioGroup
          row
          value={mode}
          onChange={(event) =>
            setMode(event.target.value as 'light' | 'dark')
          }
          sx={{display: "flex", justifyContent: "space-between"}}
        >
          <FormControlLabel value="light" control={<Radio />} label="Světlý" />
          <FormControlLabel value="dark" control={<Radio />} label="Tmavý" />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default ThemeSelector