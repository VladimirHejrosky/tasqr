"use client";
import {
  AppBar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { links } from "../data/links";
import { usePathname, useRouter } from "next/navigation";

const MainHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLink = links.find((link) => link.path === pathname);
  return (
    <>
      {pathname !== "/signin" && 
        <Box mb={2}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                fontWeight={700}
                variant="h4"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                {currentLink?.path === "/"
                  ? "tasqr"
                  : currentLink?.label?.toLocaleLowerCase()}
              </Typography>
              <List sx={{ display: { xs: "none", lg: "flex" } }}>
                {links.map((link, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      sx={{ textAlign: "center" }}
                      onClick={() => router.push(link.path)}
                    >
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ display: { lg: "none" } }}>
                {currentLink?.icon && <currentLink.icon />}
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      }
    </>
  );
};

export default MainHeader;
