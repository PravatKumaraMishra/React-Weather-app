import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./hooks/api";
import Card from "./components/card/Card";
import DailyForecast from "./components/card/DailyForecast";

export default function App() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 22.24, lon: 87.67 }),
    staleTime: 24 * 60 * 60 * 1000, // 1 day
  });
  return (
    <>
      <DailyForecast
        coords={{
          lat: 22.42,
          lon: 87.33,
        }}
      />
      {/* <Card>{JSON.stringify(data?.hourly)}</Card> */}
      <Card>{JSON.stringify(data)}</Card>
    </>
  );
}
