import { ChangeEvent, useState, useRef } from "react";
import _ from "lodash";
import { FaSearch } from "react-icons/fa";
import { useCity, City } from "../hooks/useCity";
import styles from "../styles/CitySearch.module.css";

type Props = {
  searchWeatherAction: (city: City) => Promise<void>;
};

export const CitySearch = (props: Props) => {
  const { searchWeatherAction } = props;

  const cityInputRef = useRef<HTMLInputElement>(null);
  const [cities, setCities] = useState<City[]>([]);
  const { search: searchCities } = useCity();

  const handleTextChange = _.debounce(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const keyword = e.target.value;
      if (!!keyword) {
        const searchResult = await searchCities(keyword);
        setCities(searchResult);
        return;
      }
      setCities([]);
    },
    300
  );

  const handleSelectCity = (city: City) => {
    setCities([]);
    if (cityInputRef.current) cityInputRef.current.value = city.name;
    searchWeatherAction(city);
  };

  return (
    <div className={styles.searchBox}>
      <div className={styles.row}>
        <input
          type="text"
          id="input-box"
          placeholder="Search a City"
          autoComplete="off"
          autoFocus
          className={styles.inputBox}
          onChange={handleTextChange}
          ref={cityInputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSelectCity(cities[0]);
            }
          }}
        />
        <button className={styles.searchButton}>
          <FaSearch
            color="black"
            size={24}
            onClick={() => {
              if (cities.length > 0) handleSelectCity(cities[0]);
            }}
          />
        </button>
      </div>
      {cities.length > 0 && (
        <div className={styles.resultBox}>
          <ul>
            {cities?.map((item) => (
              <li key={item.name} onClick={() => handleSelectCity(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
