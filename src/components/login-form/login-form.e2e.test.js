import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {LoginForm} from "./login-form.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


it(`Should login submit`, () => {

  const onSubmitHanler = jest.fn();
  const loginComponent = shallow(<LoginForm onSubmit={onSubmitHanler} error={`Error auth`}/>);

  const form = loginComponent.find(`form.login__form`);

  form.simulate(`submit`, {preventDefault: () => {}});
  expect(onSubmitHanler).toHaveBeenCalledTimes(1);
});
