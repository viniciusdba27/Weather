import React, { useState } from "react";
import { Helpers, Metrics } from "../../theme"; // TODO: add babel
import { get } from "../../api/BaseApi";
import Config from "../../config";
import { Icon } from "../../components";
import Styles from "./styles";

const Main = () => {
  const [isLoading, setIsLoding] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [forecast, setForecast] = useState(undefined);
  const [days, setDays] = useState(1);

  const search = async () => {
    setIsLoding(true);
    let url = new URL(Config.search);
    url.searchParams.append("query", query);

    try {
      const resp = await get(url);

      setResult(resp);
      setIsLoding(false);
    } catch (e) {
      setIsLoding(false);
      console.log("exception", e);
    }
  };

  const getCityInfo = async () => {
    console.log("city", city);
    setIsLoding(true);
    let url = new URL(`${Config.city}${city?.woeid}`);

    try {
      const resp = await get(url);
      const consolidatedWeather = resp?.consolidated_weather;
      console.log("consolidatedWeather", consolidatedWeather);

      setForecast(consolidatedWeather);
      setIsLoding(false);
    } catch (e) {
      setIsLoding(false);
      console.log("exception", e);
    }
  };

  const clearStates = () => {
    setIsLoding(false);
    setQuery("");
    setResult(undefined);
    setCity(undefined);
    setForecast(undefined);
    setDays(undefined);
  };

  const onCityChange = (e) => {
    setResult(undefined);
    const value = e?.target?.value;

    setQuery(value?.trimStart());
  };

  const onDayChange = (e) => {
    const value = e?.target?.value;
    setDays(value);
  };

  const handleCityPress = (city) => {
    setCity(city);
  };

  return (
    <div style={{ ...Helpers.column, ...Metrics.padding }}>
      {!city && (
        <Header query={query} onChange={onCityChange} onClick={search} />
      )}
      <div style={Helpers.column}>
        {!city && <CityListing items={result} onClick={handleCityPress} />}
      </div>
      {city && !forecast && (
        <Days value={days} onChange={onDayChange} onClick={getCityInfo} />
      )}
      {forecast && (
        <div style={{ ...Helpers.column, ...Metrics.verticalMargin }}>
          <div style={Helpers.fillRow}>
            <h3>{city?.title}</h3>
            <button onClick={clearStates}>clear</button>
          </div>
          {forecast?.map((item, index) => {
            if (index >= days) return null;
            return <Icon item={item} key={`icon-${index}`} />;
          })}
        </div>
      )}

      {isLoading && (
        <div style={{ ...Helpers.column, ...Metrics.verticalMargin }}>
          <p>loading...</p>
        </div>
      )}
    </div>
  );
};

const CityListing = ({ items = [], onClick = () => undefined }) => {
  return items?.map((item, index) => (
    <div
      style={{ ...Helpers.fillRow, ...Metrics.verticalMargin }}
      key={`city-${index}`}
    >
      <a href="/#" onClick={() => onClick(item)} style={Styles.city}>
        {item?.title}
      </a>
    </div>
  ));
};

const Header = ({
  query = "",
  onChange = () => undefined,
  onClick = () => undefined,
}) => (
  <div style={{ ...Helpers.column, ...Metrics.verticalMargin }}>
    <label>
      City Name:
      <input type="text" name="name" value={query} onChange={onChange} />
    </label>
    <button onClick={onClick}>search</button>
  </div>
);

const Days = ({
  value = 1,
  onChange = () => undefined,
  onClick = () => undefined,
}) => (
  <div style={{ ...Helpers.column, ...Metrics.verticalMargin }}>
    <label>
      Days:
      <input type="number" name="name" value={value} onChange={onChange} />
    </label>
    <button onClick={onClick}>Go!</button>
  </div>
);

export default Main;
