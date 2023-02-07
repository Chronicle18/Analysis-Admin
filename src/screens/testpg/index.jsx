import { Box } from "@mui/material";
import Header from "../../components/Header";
import Analytics from "../../components/TestPg";
const TestPage = () => {

  return (
    <Box m="20px">
      <Header title="Test Page" subtitle="Data" />
      <Box height="70vh">
        <Box>Phantom Pets</Box>
        <Analytics />
      </Box>
    </Box>
  );
};

export default TestPage;