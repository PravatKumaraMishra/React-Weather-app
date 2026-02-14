import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./hooks/api";
import Card from "./components/card/Card";

export default function App() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
    staleTime: 24 * 60 * 60 * 1000, // 1 day
  });
  return (
    <>
      <Card>{JSON.stringify(data?.current)}</Card>
      <Card>{JSON.stringify(data?.hourly)}</Card>
      <Card>{JSON.stringify(data?.daily)}</Card>
    </>
  );
}
