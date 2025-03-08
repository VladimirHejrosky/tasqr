import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";


const possibleQueries = ["active", "completed", "repeated"];
export type PossibleTaskQueries = (typeof possibleQueries)[number];

export default function TabPanel({ query }: { query?: PossibleTaskQueries | undefined})  {

    const currentTabIndex = possibleQueries.findIndex(item => item === query)
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={currentTabIndex != -1 ? currentTabIndex : 0} centered>
        <Tab label="Aktivní" component={Link} href="/tasks?status=active" />
        <Tab label="Dokončené" component={Link} href="/tasks?status=completed" />
        <Tab label="Opakované" component={Link} href="/tasks?status=repeated" />
      </Tabs>
    </Box>
  );
}
