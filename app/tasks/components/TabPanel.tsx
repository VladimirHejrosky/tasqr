import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";

interface Props {
  status: "active" | "completed" | "repeated" 
}
const possibleQueries = ["active", "completed", "repeated"];

export default function TabPanel({status}: Props) {

    const currentTabIndex = possibleQueries.findIndex(item => item === status)
    
  return (
    <Box sx={{ width: "100%", maxWidth:"600px", marginX:"auto", bgcolor: "background.paper" }}>
      <Tabs value={currentTabIndex != -1 ? currentTabIndex : 0} centered>
        <Tab label="Aktivní" component={Link} href="/tasks?status=active" />
        <Tab label="Dokončené" component={Link} href="/tasks?status=completed" />
        <Tab label="Opakované" component={Link} href="/tasks?status=repeated" />
      </Tabs>
    </Box>
  );
}
