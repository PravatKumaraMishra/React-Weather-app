import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./hooks/api";
import Card from "./components/card/Card";
import DailyForecast from "./components/card/DailyForecast";
import HourlyForecast from "./components/card/HourlyForecast";

export default function App() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 22.42, lon: 87.33 }),
    staleTime: 24 * 60 * 60 * 1000, // 1 day
  });
  return (
    <div className="flex flex-col gap-8">
      <Card>{JSON.stringify(data)}</Card>
      <HourlyForecast coords={{ lat: 22.42, lon: 87.33 }} />
      <DailyForecast coords={{ lat: 22.42, lon: 87.33 }} />
    </div>
  );
}
