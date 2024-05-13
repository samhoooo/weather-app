import { FaCloudRain, FaWind } from "react-icons/fa";

import styles from "../styles/WeatherDisplay.module.css";
import { WeatherData } from "@/hooks/useWeather";

type Props = {
  data: WeatherData;
  isFetchError: boolean;
};

export const WeatherDisplay = (props: Props) => {
  const { isFetchError } = props;
  const { temperature, precipitation, windSpeed, cityName } = props.data;

  // Display an error message if the fetch operation failed
  if (isFetchError) {
    return (
      <div className={styles.error}>
        Something went wrong :( Please try again later
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {cityName && <h2>{cityName} </h2>}
      {temperature != null && (
        <div className={styles.temperature}>{temperature} °C</div>
      )}

      {precipitation != null && (
        <div>
          <FaCloudRain /> {precipitation} mm
        </div>
      )}
      {windSpeed != null && (
        <div>
          <FaWind /> {windSpeed} km/h
        </div>
      )}
    </div>
  );
};
