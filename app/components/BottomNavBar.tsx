"use client";
import { Box, Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { usePathname, useRouter } from "next/navigation";
import { links } from "../data/links";

export default function BottomNavBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {pathname !== "/signin" && (
        <Box sx={{ marginTop: {xs: "150px", lg: "0" }}}>
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            display: { lg: "none" },
          }}
          elevation={3}
        >
          <BottomNavigation 
          sx={{paddingTop: "30px", paddingBottom: "40px"}}
            showLabels
            value={links.findIndex((link) => link.path === pathname)}
            onChange={(event, newValue) => {
              router.push(links[newValue].path);
            }}
          >
            {links.map((link, index) => (
              link.main === true &&
              <BottomNavigationAction
                key={index}
                label={link.label}
                icon={link.icon ? <link.icon /> : null}
              />
            ))}
          </BottomNavigation>
        </Paper>
        </Box>
      )}
    </>
  );
}
