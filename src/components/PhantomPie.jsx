import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import Header from "./Header";
import { tokens } from '../theme';
import { MenuItem, useTheme } from "@mui/material";
import { Select } from "@mui/material";

const PhantomPie = () => {
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState("");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(
				"http://54.255.93.215/phantom_pets/overall_leaderboard"
			);
			setData(result.data);
			setFilteredData(result.data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (selectedCountry === "") {
			setFilteredData(data);
		} else {
			setFilteredData(
				data.filter(
					(item) => item.country.toLowerCase() === selectedCountry.toLowerCase()
				)
			);
		}
	}, [selectedCountry, data]);

	const getOption = () => {
		if (selectedCountry === "") {
			let countryMap = {};
			data.forEach((item) => {
				if (!countryMap[item.country]) {
					countryMap[item.country] = 0;
				}
				countryMap[item.country]++;
			});

			let countryArr = [];
			for (const country in countryMap) {
				countryArr.push({ name: country, value: countryMap[country] });
			}

			return {
				title: {
					text: "Country leaderboard",
					left: "center",
                    textStyle: {color: colors.greenAccent[400]},
				},
				tooltip: {
					trigger: "item",
					formatter: "{a} <br/>{b} : {c} ({d}%)",
				},
				legend: {
					orient: "vertical",
					left: "left",
					data: countryArr.map((item) => item.name),
                    textStyle: { color: colors.grey[500]},
				},
				series: [
					{
						name: "Country",
						type: "pie",
						radius: "55%",
						center: ["50%", "60%"],
						data: countryArr,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
                        label: {
                            normal: {
                              formatter: (params) => {
                                return params.name + ": " + params.value;
                              },
                            textStyle: { color: colors.grey[300]},
                            },
                          }, 
					},
				],
			};
		} else {
			let cityMap = {};
			filteredData.forEach((item) => {
				if (!cityMap[item.city]) {
					cityMap[item.city] = 0;
				}
				cityMap[item.city]++;
			});

			let cityArr = [];
			for (const city in cityMap) {
				cityArr.push({ name: city, value: cityMap[city] });
			}
			return {
				title: {
					text: `${selectedCountry} City Leaderboard`,
					left: "center",
				},
				tooltip: {
					trigger: "item",
					formatter: "{a} <br/>{b} : {c} ({d}%)",
				},
				legend: {
					orient: "vertical",
					left: "left",
					data: cityArr.map((item) => item.name),
				},
				series: [
					{
						name: "City",
						type: "pie",
						radius: "55%",
						center: ["50%", "60%"],
						data: cityArr,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
					},
				],
			};
		}
	};

	const handleCountrySelect = (value) => {
		setSelectedCountry(value);
	};

	return (
		<div>
            <div>
                <Header subtitle={"Pie Analytics"}/>
            </div>
			<Select 
                sx={{minWidth: 80}}
                onChange={(e) => handleCountrySelect(e.target.value)}
                displayEmpty
            >
				<MenuItem value="">All</MenuItem>
				{Array.from(new Set(data.map((item) => item.country))).map(
					(country) => (
						<MenuItem key={country} value={country}>
							{country}
						</MenuItem>
					)
				)}
			</Select>
			<ReactEcharts option={getOption()} style={{height:"600px"}}/>
		</div>
	);
};

export default PhantomPie;
