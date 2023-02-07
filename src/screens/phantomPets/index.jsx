import { Box } from "@mui/material";
import Header from "../../components/Header";
import PhantomTable from "../../components/PhantomTable";
import ReactEcharts from "../../components/PhantomChart";

const Phantom = () => {

  return (
    <Box m="20px">
      <Box height="50vh">
      <Header title={"Phantom Pets"} subtitle="LeaderBoard" />
      <PhantomTable />
      <ReactEcharts />
      </Box>
    </Box>
  );
};

export default Phantom;