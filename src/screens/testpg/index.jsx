import { Box } from "@mui/material";
import Header from "../../components/Header";
import Test from "../../components/TestPg";

const TestPage = () => {

  return (
    <Box m="20px">
      <Header title="Test Page" subtitle="Data" />
      <Box height="70vh">
        <Test />
      </Box>
    </Box>
  );
};

export default TestPage;