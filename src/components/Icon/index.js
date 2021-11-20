import React from "react";
import { Helpers, Metrics } from "../../theme"; // TODO: add babel
import Config from "../../config";
import Styles from "./styles";

const Icon = ({ item }) => {
  const { applicable_date, weather_state_abbr } = item;
  const url = `${Config.icon}${weather_state_abbr}.png`;
  console.log("ITEM", item);
  return (
    <div style={{ ...Helpers.fillRow, ...Metrics.verticalMargin }}>
      <p>{new Date(applicable_date).toDateString()}</p>
      <div style={Styles.icon(url)} />
    </div>
  );
};

export default Icon;
