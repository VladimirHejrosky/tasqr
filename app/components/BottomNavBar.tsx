"use client"
import { Assignment, Settings, ShoppingCart } from '@mui/icons-material';
import { Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useState } from 'react';

export default function BottomNavBar() {
  const [value, setValue] = useState(0);

  return (
    <Paper  sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: {lg: "none"} }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Úkoly" icon={<Assignment />} />
          <BottomNavigationAction label="Nákup" icon={<ShoppingCart />} />
          <BottomNavigationAction label="Nastavení" icon={<Settings />} />
        </BottomNavigation>
      </Paper>
  );
}