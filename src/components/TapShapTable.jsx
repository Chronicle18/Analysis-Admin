import { Box, useTheme } from "@mui/system";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import React, { useState } from "react";
import { Button } from "@mui/material";


function PlayersTable() {
	const [players, setPlayers] = useState([]);
	const [display, setDisplay] = useState("top10");

	const fetchData = (endpoint) => {
		fetch(`http://13.215.25.111/tap_shap_${endpoint}`)
			.then((res) => res.json())
			.then((data) => setPlayers(data));
	};
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const columns = [
		{
			field: display === "top10" ? "rank" : "id",
			headerName: "RANK/ID",
			type: "number",
		},
		{
			field: "player_name",
			headerName: "NAME",
			cellClassName: "name-column--cell",
		},
		{ field: "player_score", headerName: "SCORE" },
		{
			field: "created",
			headerName: "CREATED",
			flex: 1,
			headerAlign: "left",
			align: "left",
		},
	];
	return (
		<Box m={"20px"}>
			
			<Button
				sx={{
					backgroundColor: colors.blueAccent[700],
					color: colors.grey[100],
					fontSize: "14px",
					fontWeight: "bold",
					padding: "5px 10px",
					marginRight: "10px",
				}}
				onClick={() => {
					fetchData("top_10");
					setDisplay("top10");
				}}
			>
				Get Top 10
			</Button>
			<Button
				sx={{
					backgroundColor: colors.blueAccent[700],
					color: colors.grey[100],
					fontSize: "14px",
					fontWeight: "bold",
					padding: "5px 10px",
				}}
				onClick={() => {
					fetchData("all_scores");
					setDisplay("all");
				}}
			>
				All Players
			</Button>
			<Box
				m=" 20px 0 0 0 "
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
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: colors.grey[100],
					},
				}}
			>
				<DataGrid
					getRowId={(row) => (display === "top10" ? row.rank : row.id)}
					rows={players}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
				/>
			</Box>
		</Box>
	);
}
export default PlayersTable;
