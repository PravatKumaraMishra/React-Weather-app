import DailyForecast from "./components/card/DailyForecast";
import HourlyForecast from "./components/card/HourlyForecast";
import CurrentWeather from "./components/card/CurrentWeather";

function App() {
  // const { data } = useQuery({
  //   queryKey: ["weather"],
  //   queryFn: () => getWeather({ lat: 22.42, lon: 87.33 }),
  //   staleTime: 24 * 60 * 60 * 1000, // 1 day
  // });
  return (
    <div className="flex flex-col gap-8 p-8">
      <CurrentWeather coords={{ lat: 22.42, lon: 87.33 }} />
      <HourlyForecast coords={{ lat: 22.42, lon: 87.33 }} />
      <DailyForecast coords={{ lat: 22.42, lon: 87.33 }} />
    </div>
  );
}

export default App;
