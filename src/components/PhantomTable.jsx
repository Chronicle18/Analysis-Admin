import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useState } from "react";

const PhantomTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [players, setPlayers] = useState([]);

	const fetchData = (endpoint) => {
		fetch(`http://54.255.93.215/phantom_pets/overall_leaderboard`)
			.then((res) => res.json())
			.then((data) => setPlayers(data));
	};

  const columns = [
    { field: "rank", headerName: "Rank", flex: 0.25,headerAlign: "left", align: "left" },
    { field: "player_name", headerName: "Name", flex: 0.25, cellClassName: "name-column--cell" },
    { field: "player_score", headerName: "Score", flex: 0.25, headerAlign: "center", align: "center"},
    { field: "country", headerName: "Country", headerAlign: "left", align: "left"},
    { field: "city", headerName: "City", flex: 0.5, },
    { field: "ip", headerName: "IP Address",type: "number", flex: 0.5, headerAlign: "left", align: "left" },
  ];

  return (
    <Box m="20px">
        <Button
				sx={{
					backgroundColor: colors.blueAccent[700],
					color: colors.grey[100],
					fontSize: "14px",
					fontWeight: "bold",
					padding: "5px 10px",
					marginRight: "10px",
				}}
				onClick={fetchData}
			>
				Get Players
			</Button>
      <Box
        m="40px 0 0 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
        //   getRowId={rank}
          rows={players}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default PhantomTable;