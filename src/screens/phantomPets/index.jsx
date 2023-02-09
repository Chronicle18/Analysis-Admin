import { Box } from "@mui/material";
import Header from "../../components/Header";
import PhantomTable from "../../components/PhantomTable";
import ReactEcharts from "../../components/PhantomChart";
import PhantomPie from "../../components/PhantomPie";

const Phantom = () => {

  return (
    <Box m="20px">
      <Box height="50vh">
      <Header title={"Phantom Pets"} subtitle="LeaderBoard" />
      <PhantomTable />
      <ReactEcharts />
      <PhantomPie />
      </Box>
    </Box>
  );
};

export default Phantom;