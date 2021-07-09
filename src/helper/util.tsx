import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors: any = {
    cases: {
        hex: "#CC1034",
        mulitiplier: 1000,
    },

    recovered: {
        hex: "#7DD71D",
        mulitiplier: 1000,
    },

    deaths: {
        hex: "#C0C0C0",
        mulitiplier: 2000,
    },
};

export const sortData = (data: any) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => b.cases - a.cases);

    return sortedData;
};

export const prettyPrintStat = (stat: any) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (
    data: any,
    casesType: string,
    countryName = "Worldwide"
) => {
    if (countryName === "Worldwide")
        return data.map((country: any) => (
            <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                pathOptions={{
                    color: casesTypeColors[casesType].hex,
                    fillColor: casesTypeColors[casesType].hex,
                }}
                radius={
                    Math.sqrt(country[casesType] / 10) *
                    casesTypeColors[casesType].mulitiplier
                }
            >
                <Popup>
                    <div className="info-container">
                        <div
                            className="info-flag"
                            style={{
                                backgroundImage: `url(${country.countryInfo.flag})`,
                            }}
                        />
                        <div className="info-name">{country.country}</div>
                        <div className="info-confirmed">
                            Cases: {numeral(country.cases).format("0,0")}
                        </div>
                        <div className="info-recovered">
                            Recovered:{" "}
                            {numeral(country.recovered).format("0,0")}
                        </div>
                        <div className="info-deaths">
                            Deaths: {numeral(country.deaths).format("0,0")}
                        </div>
                    </div>
                </Popup>
            </Circle>
        ));
    else {
        const country = data.find(
            (x: any) => x.countryInfo.iso2 === countryName
        );
        return (
            <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                pathOptions={{
                    color: casesTypeColors[casesType].hex,
                    fillColor: casesTypeColors[casesType].hex,
                }}
                radius={
                    Math.sqrt(country[casesType] / 10) *
                    casesTypeColors[casesType].mulitiplier
                }
            >
                <Popup>
                    <div className="info-container">
                        <div
                            className="info-flag"
                            style={{
                                backgroundImage: `url(${country.countryInfo.flag})`,
                            }}
                        />
                        <div className="info-name">{country.country}</div>
                        <div className="info-confirmed">
                            Cases: {numeral(country.cases).format("0,0")}
                        </div>
                        <div className="info-recovered">
                            Recovered:{" "}
                            {numeral(country.recovered).format("0,0")}
                        </div>
                        <div className="info-deaths">
                            Deaths: {numeral(country.deaths).format("0,0")}
                        </div>
                    </div>
                </Popup>
            </Circle>
        );
    }
};
