"use client"
import { Hidden, Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { usePathname, useRouter } from "next/navigation";
import { links } from "../data/links";

export default function BottomNavBar() {
  const pathname = usePathname();
  const router = useRouter();
  
  return (
    <Paper  sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: {lg: "none"}}} elevation={3}>
        <BottomNavigation
          showLabels
          value={links.findIndex(link => link.path === pathname)}
          onChange={(event, newValue) => {
            router.push(links[newValue].path);
          }}
          >
          {links.map((link, index) => (
            <BottomNavigationAction key={index} label={link.label} icon={<link.icon />}/>))}
        </BottomNavigation>
      </Paper>
  );
}