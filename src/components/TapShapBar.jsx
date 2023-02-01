import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import { InputLabel, MenuItem, Select, Grid, Box } from "@mui/material";
import Header from "./Header";

const PlayerAnalytics = () => {

	const [data, setData] = useState({});
	const [selectedYear, setSelectedYear] = useState("");
	const [selectedMonth, setSelectedMonth] = useState("");
	const [showMonthDropdown, setShowMonthDropdown] = useState(true);
    
	useEffect(() => {
		axios
			.get("http://13.215.25.111/analytics/overall/")
			.then((res) => setData(res.data))
			.catch((err) => console.error(err));
	}, []);
	const handleYearChange = (e) => {
		setSelectedYear(e.target.value);
		setShowMonthDropdown(true);
	};
	const handleMonthChange = (e) => {
		setSelectedMonth(e.target.value);
	};
	const getOption = () => {
		if (!data.Player_Yearly_Analytics) {
			return {};
		}
		let xAxisData = [];
		let seriesData = [];
		if (selectedYear && selectedMonth) {
			const dailyData = data.Player_Daily_Analytics.filter(
				(item) =>
					item.year === parseInt(selectedYear) &&
					item.month === parseInt(selectedMonth)
			);
			xAxisData = dailyData.map((item) => `${item.day}`);
			seriesData = dailyData.map((item) => item.count);
		} else if (selectedYear) {
			const monthlyData = data.Player_Monthly_Analytics.filter(
				(item) => item.year === parseInt(selectedYear)
			);
			xAxisData = monthlyData.map((item) => `${item.month}`);
			seriesData = monthlyData.map((item) => item.count);
		} else {
			xAxisData = data.Player_Yearly_Analytics.map((item) => `${item.year}`);
			seriesData = data.Player_Yearly_Analytics.map((item) => item.count);
		}
		return {
			
			tooltip:{
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			xAxis: {
				type: "category",
				data: xAxisData,
				axisTick:{alignWithLabel: true}
			},
			yAxis: {
				type: "value",
			},
			series: [
				{
					data: seriesData,
					type: "bar",
					label: {
						show: false,
						position: "top",
						formatter: "{c}",
					},
				},
			],
		};
	};
	return (
		<div>
			<Box>
				<Header title={""} subtitle="Analytics" />
			</Box>
			<Grid container spacing={2}>
				<Grid item xs={3}>
					<InputLabel>Player</InputLabel>

				</Grid>
				<Grid item xs={3}>
				<InputLabel htmlFor="year-select">Year</InputLabel>
				<Select
					id="year-select"
					value={selectedYear}
					label="Year"
					onChange={handleYearChange}
				>
					<MenuItem value=''>All</MenuItem>
					{data.Player_Yearly_Analytics &&
						data.Player_Yearly_Analytics.map((item) => (
							<MenuItem key={item.year} value={item.year}>
								{item.year}
							</MenuItem>
						))}
				</Select>
				</Grid>
				{showMonthDropdown && (
					<Grid item xs={3}>
						<InputLabel htmlFor="month-select">Month</InputLabel>
						<Select
							id="month-select"
							value={selectedMonth}
							onChange={handleMonthChange}
						>
							<MenuItem value=''>All</MenuItem>
							{data.Player_Monthly_Analytics &&
								data.Player_Monthly_Analytics.filter(
									(item) => item.year === parseInt(selectedYear)
								).map((item) => (
									<MenuItem key={item.month} value={item.month}>
										{item.month}
									</MenuItem>
								))}
						</Select>
					</Grid>
				)}
			</Grid>
			<ReactEcharts
				option={getOption()}
				style={{ height: "600px", width: "100%" }}
			/>
		</div>
	);
};

export default PlayerAnalytics;
