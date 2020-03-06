import React from "react";
import renderer from "react-test-renderer";
import Login from "./login.jsx";

it(`Render Login`, () => {
  const tree = renderer
      .create(<Login onSubmit={() => {}} />)
      .toJSON();
  expect(tree).toMatchSnapshot();
});
