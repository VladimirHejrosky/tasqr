"use client"
import { Assignment, Home, Settings, ShoppingCart } from '@mui/icons-material';
import { Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { usePathname, useRouter } from "next/navigation";

export default function BottomNavBar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const links = [
    {label: "Domů", path: "/", icon: <Home />},
    {label: "Úkoly", path: "/tasks", icon: <Assignment />}, 
    {label: "Nákup", path: "/shopping", icon: <ShoppingCart />},
    {label: "Nastavení", path: "/settings", icon: <Settings />}
  ]

  return (
    <Paper  sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={links.findIndex(link => link.path === pathname)}
          onChange={(event, newValue) => {
            router.push(links[newValue].path);
          }}
        >
          {links.map((link, index) => (
            <BottomNavigationAction key={index} label={link.label} icon={link.icon}/>))}
            
        </BottomNavigation>
      </Paper>
  );
}