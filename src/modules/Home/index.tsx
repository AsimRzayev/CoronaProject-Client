import React, { useEffect, useState } from "react";
import "./index.css";
import {
    FormControl,
    Select,
    MenuItem,
    Card,
    CardContent,
} from "@material-ui/core";
import { InfoBox } from "../../components/InfoBox";
import { Map } from "../../components/Map";
import { ICountryInfoState } from "../../interface";
import { Table } from "../../components/Table";
import { sortData, prettyPrintStat } from "../../helper/util";
import LineGraph from "../../components/LineGragh";
import "leaflet/dist/leaflet.css";
export const Home = () => {
    const [countries, setCountries] = useState(["USA", "UK", "INDIA"]);
    const [country, setCountry] = useState("Worldwide");
    const [tableData, setTableData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [countryInfo, setCountryInfo] = useState<ICountryInfoState>({
        todayCases: 0,
        todayRecovered: 0,
        todayDeaths: 0,
        cases: 0,
        deaths: 0,
        recovered: 0,
    });

    const [mapCenter, setMapCenter] = useState({
        lat: 34.80746,
        lng: -40.4796,
    });
    const [mapZoom, setMapZoom] = useState(3);
    const [casesType, setCasesType] = useState("cases");
    const [mapCountries, setmapCountries] = useState([]);

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
            });
    }, []);

    useEffect(() => {
        const getContriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country: any) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));
                    const sortedData: any = sortData(data);
                    setTableData(sortedData);
                    setCountries(countries);
                    setmapCountries(data);
                });
        };
        getContriesData();
    }, []);

    const onCountryChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLoading(true);
        const countryCode = event.target.value;
        setCountry(countryCode);
        const url =
            countryCode === `Worldwide`
                ? `https://disease.sh/v3/covid-19/all`
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                setCountryInfo(data);
                if (countryCode !== "Worldwide") {
                    setMapCenter({
                        lat: data.countryInfo.lat,
                        lng: data.countryInfo.long,
                    });
                    setMapZoom(5);
                } else {
                    setMapCenter({
                        lat: 34.80746,
                        lng: -40.4796,
                    });
                    setMapZoom(3);
                }
            });
    };
    return (
        <div className="home">
            <div className="home_left">
                <div className="home_header">
                    <h1 style={{ color: "#f50057" }}>COVID-19 TRACKER</h1>
                    <FormControl className="home_dropdown">
                        <Select
                            variant="outlined"
                            value={country}
                            onChange={(e: React.ChangeEvent<any>) =>
                                onCountryChange(e)
                            }
                        >
                            <MenuItem
                                key={"43wster57tdye5s5e4se45w45s"}
                                value="Worldwide"
                            >
                                Worldwide
                            </MenuItem>
                            {countries.map((country: any, idx: number) => (
                                <MenuItem key={idx} value={country.value}>
                                    {country.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="home_stats">
                    <InfoBox
                        onClick={() => setCasesType("cases")}
                        title={"Coronavirus cases"}
                        isRed={true}
                        active={casesType === "cases"}
                        className="infoBox_cases"
                        total={prettyPrintStat(countryInfo.cases)}
                        cases={prettyPrintStat(countryInfo.todayCases)}
                        isloading={isLoading}
                        isGrey={false}
                    />
                    <InfoBox
                        active={casesType === "recovered"}
                        className="infoBox_recovered"
                        onClick={() => setCasesType("recovered")}
                        title="Recovered"
                        total={prettyPrintStat(countryInfo.recovered)}
                        cases={prettyPrintStat(countryInfo.todayRecovered)}
                        isloading={isLoading}
                        isGrey={false}
                        isRed={false}
                    />
                    <InfoBox
                        isGrey={true}
                        active={casesType === "deaths"}
                        className="infoBox_deaths"
                        onClick={() => setCasesType("deaths")}
                        title="Deaths"
                        total={prettyPrintStat(countryInfo.deaths)}
                        cases={prettyPrintStat(countryInfo.todayDeaths)}
                        isloading={isLoading}
                        isRed={false}
                    />
                </div>

                <Map
                    countries={mapCountries}
                    casesType={casesType}
                    center={mapCenter}
                    zoom={mapZoom}
                    countryName={country}
                />
            </div>

            <Card className="home_right">
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    <Table countries={tableData} />
                    <h3>Worldwide new {casesType}</h3>
                    <LineGraph casesType={casesType} />
                </CardContent>
            </Card>
        </div>
    );
};
