import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "../../helper/util";
interface IMapProps {
    countries: any;
    casesType: string;
    center: any;
    zoom: number;
    countryName: string;
}
interface IChangeView {
    center: any;
    zoom: number;
}
export const Map: React.FC<IMapProps> = ({
    countries,
    casesType,
    center,
    zoom,
    countryName,
}) => {
    function ChangeView(AChangeView: IChangeView) {
        const map = useMap();
        map.setView(AChangeView.center, AChangeView.zoom);
        return null;
    }
    return (
        <MapContainer
            className="map"
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
        >
            <ChangeView center={center} zoom={zoom} />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {showDataOnMap(countries, casesType, countryName)}
        </MapContainer>
    );
};
