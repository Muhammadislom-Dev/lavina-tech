import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ModalCreate from "../../components/Modal/Modal";
import Book from "../Book";

const drawerWidth = 240;
export default function ResponsiveDrawer() {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        <ModalCreate />
        <Book />
      </Box>
    </Box>
  );
}
