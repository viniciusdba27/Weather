import React from "react";
import Icon from "../index";
import renderer from "react-test-renderer";

const mockedData = {
  id: 5136007935557632,
  weather_state_name: "Heavy Cloud",
  weather_state_abbr: "hc",
  wind_direction_compass: "WNW",
  created: "2021-11-20T03:59:17.329185Z",
  applicable_date: "2021-11-19",
  min_temp: 12.56,
  max_temp: 15.44,
  the_temp: 16.195,
  wind_speed: 3.6720387739070492,
  wind_direction: 287.57292905230133,
  air_pressure: 1021.5,
  humidity: 77,
  visibility: 6.242294997216257,
  predictability: 71,
};

it("Icon renders correctly", async () => {
  const component = renderer.create(<Icon item={mockedData} />).toJSON();
  expect(component).toMatchSnapshot();
});
