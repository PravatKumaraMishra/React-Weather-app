import DailyForecast from "./components/card/DailyForecast";
import HourlyForecast from "./components/card/HourlyForecast";
import CurrentWeather from "./components/card/CurrentWeather";
import AdditionalInfo from "./components/card/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";

function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 22.21, lon: 87.68 });
  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat: lat, lon: lon });
  };
  return (
    <div className="flex flex-col gap-8 p-8">
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
