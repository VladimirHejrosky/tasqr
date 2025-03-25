import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Link from "next/link";


interface Props {
  status: "active" | "completed" | "repeated" 
}
const possibleQueries = ["active", "completed", "repeated"];

export default function TabPanel({status}: Props) {

    const currentTabIndex = possibleQueries.findIndex(item => item === status)
    
  return (
    <Box sx={{ width: "100%", marginX:"auto", bgcolor: "background.paper" }}>
      <Tabs value={currentTabIndex != -1 ? currentTabIndex : 0} centered>
        <Tab label="Aktivní" component={Link} href="/tasks?status=active" />
        <Tab label="Dokončené" component={Link} href="/tasks?status=completed" />
        <Tab label="Opakované" component={Link} href="/tasks?status=repeated" />
        <Tab label={<AddIcon/>} component={Link} href="/tasks/new" sx={{ display: { xs: "none", lg: "flex"}}} />
      </Tabs>
    </Box>
  );
}
