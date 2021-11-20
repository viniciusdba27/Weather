import React from "react";
import Main from "../index";
import renderer from "react-test-renderer";

it("Main renders correctly", async () => {
  const component = renderer.create(<Main />).toJSON();
  expect(component).toMatchSnapshot();
});
