import DailyForecast from "./components/card/DailyForecast";
import HourlyForecast from "./components/card/HourlyForecast";
import CurrentWeather from "./components/card/CurrentWeather";
import AdditionalInfo from "./components/card/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";
import LocationDropDown from "./components/dropDown/LocationDropDown";
import { useQuery } from "@tanstack/react-query";
import { getGeocode } from "./hooks/api";
import SearchBar from "./components/dropDown/SearchBar";

function App() {
  const [coordinates, setCoords] = useState<Coords>({ lat: 22.21, lon: 87.68 });
  const [location, setLocation] = useState<string>("Kharagpur");

  const { data: geoCodeData } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeocode(location),
  });
  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat: lat, lon: lon });
    setLocation("custom");
  };
  const coords =
    location === "custom"
      ? coordinates
      : { lat: geoCodeData?.[0].lat ?? 0, lon: geoCodeData?.[0].lon ?? 0 };
  return (
    <div className="flex flex-col gap-8 p-2 lg:p-8">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <h2 className="text-2xl font-semibold">Location: </h2>
        <LocationDropDown location={location} setLocation={setLocation} />
        <SearchBar setLocation={setLocation} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <CurrentWeather coords={coords} />
        <Map coords={coords} onMapClick={onMapClick} />
      </div>
      <HourlyForecast coords={coords} />
      <DailyForecast coords={coords} />
      <AdditionalInfo coords={coords} />
    </div>
  );
}

export default App;
