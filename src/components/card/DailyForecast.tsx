import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../hooks/api";
import type { Coords } from "../../types";
import Card from "./Card";

type Props = {
  coords: Coords;
};
export default function DailyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });
  const KelvinToCelcious = (temperature: number) => {
    return temperature - 273.15;
  };
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
          <img
            className="size-8"
            alt="weather Icon"
            src={`https://openweathermap.org/payload/api/media/file/${day.weather[0].icon}.png`}
          />
          <p>{Math.round(KelvinToCelcious(day.temp.day))}°C</p>
          <p className="text-gray-500/75">
            {Math.round(KelvinToCelcious(day.temp.min))}°C
          </p>
          <p className="text-gray-500/75">
            {Math.round(KelvinToCelcious(day.temp.max))}°C
          </p>
        </div>
      ))}
    </Card>
  );
}
