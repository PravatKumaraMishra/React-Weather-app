import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { Suspense, useState } from "react";
import type { Coords } from "./types";
import LocationDropDown from "./components/dropDown/LocationDropDown";
import { useQuery } from "@tanstack/react-query";
import { getGeocode } from "./hooks/api";
import SearchBar from "./components/dropDown/SearchBar";
import MaptypeDropdown from "./components/dropDown/MaptypeDropdown";
import MapLegend from "./components/MapLegend";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import AdditionalInfoSkeleton from "./components/skeletons/AdditionalInfoSkeleton";

function App() {
  const [coordinates, setCoords] = useState<Coords>({ lat: 22.21, lon: 87.68 });
  const [location, setLocation] = useState<string>("Kharagpur");
  const [mapType, setMapType] = useState<string>("clouds_new");

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
        <p className="text-xl font-semibold">Location: </p>
        <LocationDropDown location={location} setLocation={setLocation} />

        <SearchBar setLocation={setLocation} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <Suspense fallback={<CurrentSkeleton />}>
          <CurrentWeather coords={coords} />
        </Suspense>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-xl text-blue-400 font-semibold">Map Type: </p>
              <MaptypeDropdown mapType={mapType} setMapType={setMapType} />
            </div>
            <MapLegend mapType={mapType} />
          </div>
          <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
        </div>
      </div>
      <Suspense fallback={<HourlySkeleton />}>
        <HourlyForecast coords={coords} />
      </Suspense>
      <Suspense fallback={<DailySkeleton />}>
        <DailyForecast coords={coords} />
      </Suspense>
      <Suspense fallback={<AdditionalInfoSkeleton />}>
        <AdditionalInfo coords={coords} />
      </Suspense>
    </div>
  );
}

export default App;
