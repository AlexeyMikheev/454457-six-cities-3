import React from "react";
import renderer from "react-test-renderer";
import LoginForm from "./login-form.jsx";


it(`Render Login`, () => {

  const tree = renderer
      .create(<LoginForm onSubmit={() => {}}/>)
      .toJSON();
  expect(tree).toMatchSnapshot();
});
