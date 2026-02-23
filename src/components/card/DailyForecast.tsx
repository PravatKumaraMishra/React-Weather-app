import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../hooks/api";
import type { Coords } from "../../types";
import { kelvinToCelsius } from "../../utils/temperature";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";

type Props = {
  coords: Coords;
};

export default function DailyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      title="Daily Forecast"
      childrenClassName="flex flex-col gap-4 2xl:justify-between"
    >
      {data?.daily.map((day) => (
        <div key={day.dt} className="flex justify-between">
          <p className="w-9">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
              weekday: "short",
            })}
          </p>
          <WeatherIcon className="2xl:size-10" src={day.weather[0].icon} />

          <p>{Math.round(kelvinToCelsius(day.temp.day))}°C</p>
          <p className="text-gray-500/75">
            {Math.round(kelvinToCelsius(day.temp.min))}°C
          </p>
          <p className="text-gray-500/75">
            {Math.round(kelvinToCelsius(day.temp.max))}°C
          </p>
        </div>
      ))}
    </Card>
  );
}
