import { Box } from "@mui/material";
import Header from "../../components/Header";
//import BarChart from "../../components/TapShapBar";
import PlayersTable from "../../components/TapShapTable";
import ReactEcharts from "../../components/TapShapBar";

const TapShap = () => {

  return (
    <Box m="20px">
      <Box height="50vh">
      <Header title={"TAP SHAP"} subtitle="LeaderBoard" />
	  	<PlayersTable />
        <ReactEcharts />
      </Box>
    </Box>
  );
};

export default TapShap;