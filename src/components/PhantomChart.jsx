import { useState, useEffect } from "react";
import Axios from "axios";
import ReactEcharts from "echarts-for-react";
import { Select, MenuItem } from "@mui/material";
import Header from "./Header";

const PhantomAnalytics = () => {

	const [playerList, setPlayerList] = useState([]);
	const [selectedPlayer, setSelectedPlayer] = useState("");
	const [playerData, setPlayerData] = useState({});
	const [overallData, setOverallData] = useState({});
	const [selectedFilterYear, setSelectedFilterYear] = useState("");
	const [selectedFilterMonth, setSelectedFilterMonth] = useState("");
	const [selectedFilterDay, setSelectedFilterDay] = useState("");

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await Axios.get(
					"http://54.255.93.215/phantom_pets/player_list"
				);
				setPlayerList(res.data);
			} catch (err) {
				console.error(err);
			}
			try {
				const res = await Axios.get("http://54.255.93.215/phantom_pets/analytics/overall/");
				setOverallData(res.data);
			} catch (err) {
				console.error(err);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		async function fetchData() {
			if (selectedPlayer) {
				try {
					const res = await Axios.get(
						`http://54.255.93.215/phantom_pets/analytics/user/${selectedPlayer}/`
					);
					setPlayerData(res.data);
					console.log(playerData);
				} catch (err) {
					console.error(err);
				}
			}
		}
		fetchData();
	}, [selectedPlayer]);

	const handlePlayerSelection = (event) => {
		setSelectedPlayer(event.target.value);
		setSelectedFilterYear("");
		setSelectedFilterMonth("");
		setSelectedFilterDay("");
	};
	const handleFilterYearSelection = (event) => {
		setSelectedFilterYear(event.target.value);
		setSelectedFilterMonth("");
		setSelectedFilterDay("");
	};
	const handleFilterMonthSelection = (event) => {
		setSelectedFilterMonth(event.target.value);
		setSelectedFilterDay("");
	};
	const handleFilterDaySelection = (event) => {
		setSelectedFilterDay(event.target.value);
		
	};

	const getDataToPlot = () => {
		let data;
		if (!selectedPlayer && !overallData.Player_Yearly_Analytics) {
		  return [];
		}
		if (selectedPlayer && playerData.Player_Yearly_Analytics) {
		  data = playerData.Player_Yearly_Analytics;
		} else {
		  data = overallData.Player_Yearly_Analytics;
		}
		if (!selectedFilterYear && !selectedFilterMonth && !selectedFilterDay) {
		  return data.map((item) => [item.year, item.count]);
		}
		if (selectedFilterYear && !selectedFilterMonth && !selectedFilterDay) {
		  data =
			selectedPlayer && playerData.Player_Monthly_Analytics
			  ? playerData.Player_Monthly_Analytics
			  : overallData.Player_Monthly_Analytics;
		  data = data.filter((item) => item.year === selectedFilterYear);
		  return data.map((item) => [`${item.year}-${item.month}`, item.count]);
		}
		if (selectedFilterYear && selectedFilterMonth && !selectedFilterDay) {
		  data =
			selectedPlayer && playerData.Player_Daily_Analytics
			  ? playerData.Player_Daily_Analytics
			  : overallData.Player_Daily_Analytics;
		  data = data.filter(
			(item) =>
			  item.year === selectedFilterYear && item.month === selectedFilterMonth
		  );
		  return data.map((item) => [
			`${item.year}-${item.month}-${item.day}`,
			item.count,
		  ]);
		}
		if (selectedFilterYear && selectedFilterMonth && selectedFilterDay) {
			data =
				selectedPlayer && playerData.Player_Daily_Analytics
					? playerData.Player_Daily_Analytics
					: overallData.Player_Daily_Analytics;
			data = data.filter(
				(item) =>
					item.year === selectedFilterYear && item.month === selectedFilterMonth 
					&& item.day === selectedFilterDay );
			return data.map((item) => [
				`${item.year}-${item.month}-${item.day}`,
					item.count,
			]);
		}
	  };
	const getYearOptions = () => {
		if (!overallData.Player_Yearly_Analytics) {
			return [];
		}
		return overallData.Player_Yearly_Analytics.map((item) => item.year);
	};
	const getMonthOptions = () => {
		if (!overallData.Player_Monthly_Analytics) {
			return [];
		}
		return overallData.Player_Monthly_Analytics.filter(
			(item) => item.year === selectedFilterYear
		).map((item) => item.month);
	};
	const getDayOptions = () => {
		if (!overallData.Player_Daily_Analytics) {
			return [];
		}
		return overallData.Player_Daily_Analytics.filter(
			(item) =>
				item.year === selectedFilterYear && item.month === selectedFilterMonth
		).map((item) => item.day);
	};
	const options = {
		tooltip: {},
		xAxis: {
			type: "category",
			data: getDataToPlot().map((item) => item[0]),
		},
		yAxis: { type: "value" },
		series: [
			{
				data: getDataToPlot().map((item) => item[1]),
				type: "bar",
			},
		],
	};
	return (
		<div className="App">
			<Header subtitle={"Analytics"}/>
			<Select
                sx={{m:1, minWidth: 80}}
				value={selectedPlayer}
				onChange={handlePlayerSelection}
				displayEmpty
			>
				<MenuItem value=""> Select Player </MenuItem>
				{playerList.map((player) => (
					<MenuItem key={player} value={player}>
						{player}
					</MenuItem>
				))}
			</Select>
			<Select
                sx={{m:1, minWidth: 80}}
				value={selectedFilterYear}
				onChange={handleFilterYearSelection}
				displayEmpty
			>
				<MenuItem value=""> Select Year </MenuItem>
				{getYearOptions().map((year) => (
					<MenuItem key={year} value={year}>
						{year}
					</MenuItem>
				))}
			</Select>
			<Select
                sx={{m:1, minWidth: 80}}
				value={selectedFilterMonth}
				onChange={handleFilterMonthSelection}
				displayEmpty
			>
				<MenuItem value=""> Select Month </MenuItem>
				{getMonthOptions().map((month) => (
					<MenuItem key={month} value={month}>
						{month}
					</MenuItem>
				))}
			</Select>
			<Select
                sx={{m:1, minWidth: 80}}
				value={selectedFilterDay}
				onChange={handleFilterDaySelection}
				displayEmpty
			>
				<MenuItem value=""> Select Day </MenuItem>
				{getDayOptions().map((day) => (
					<MenuItem key={day} value={day}>
						{day}
					</MenuItem>
				))}
			</Select>
			<ReactEcharts option={options} style={{height: 450}} />
		</div>
	);
};
export default PhantomAnalytics;