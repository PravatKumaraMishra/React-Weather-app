import { weatherSchema } from "../schema/weatherSchema";

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const API_key = import.meta.env.VITE_API_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_key}`,
  );
  const data = await res.json();
  return weatherSchema.parse(data);
}
