import { useState } from "react";
import { City } from "./useCity";

type WeatherAPIResponse = {
  temperature?: number;
  precipitation?: number;
  windSpeed?: number;
};
export type WeatherData = {
  cityName?: string;
} & WeatherAPIResponse;

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const [isError, setIsError] = useState(false);

  const fetchWeatherInfo = async (city: City) => {
    const res = await fetch(
      `api/weather?lat=${city.latitude}&long=${city.longitude}`
    );
    const info = (await res.json()) as WeatherData;

    // Check if the API response is ok
    if (!res.ok) {
      setIsError(true);
      return;
    }

    setWeatherData({ ...info, cityName: city.name });
  };

  return {
    weatherData,
    fetchWeatherInfo,
    isError,
  };
};
