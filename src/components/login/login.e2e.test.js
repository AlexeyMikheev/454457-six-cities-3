import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Login from "./login.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should login submit`, () => {
  const onSubmitHanler = jest.fn();
  const loginComponent = mount(<Login onSubmit={onSubmitHanler} />);

  const form = loginComponent.find(`form.login__form`);

  form.simulate(`submit`, {preventDefault: () => {}});
  expect(onSubmitHanler).toHaveBeenCalledTimes(1);
});
