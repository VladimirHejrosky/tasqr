"use client";
import {
  AppBar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { links } from "../data/links";
import { useParams, usePathname, useRouter,} from "next/navigation";

const MainHeader = () => {
  const router = useRouter()
  const {id} = useParams()
  const pathname = usePathname();

  const currentLink = links.find((link) => {
    const expectedLink = id ? `${link.path}/${id}` : link.path
    return expectedLink === pathname
  })
  
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
                  link.main === true &&
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
