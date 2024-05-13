import { useWeather } from "@/hooks/useWeather";
import { CitySearch } from "./CitySearch";
import { WeatherDisplay } from "./WeatherDisplay";
import { useEffect } from "react";

export const WeatherApp = () => {
  const { weatherData, fetchWeatherInfo, isError } = useWeather();

  useEffect(() => {
    // Fetch London weather data by default
    fetchWeatherInfo({ name: "London", latitude: 51.5074, longitude: -0.1278 });
  }, []);

  return (
    <div>
      <CitySearch searchWeatherAction={fetchWeatherInfo} />
      <WeatherDisplay data={weatherData} isFetchError={isError} />
    </div>
  );
};
