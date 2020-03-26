import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoginForm from "./login-form.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


it(`LoginForm e2e`, () => {

  const mockLogin = `login`;
  const mockPassword = `password`;

  const submitHanler = jest.fn();
  const loginComponent = mount(<LoginForm submitForm={submitHanler} error={`Error auth`}/>, );

  const form = loginComponent.find(`form.login__form`);
  const login = form.find(`input.login__input[name='email']`);
  login.simulate(`input`, {target: {value: mockLogin}});

  const password = form.find(`input.login__input[name='password']`);
  password.simulate(`input`, {target: {value: mockPassword}});

  form.simulate(`submit`, {
    preventDefault: () => {},
  });
  expect(submitHanler).toHaveBeenCalledTimes(1);
  expect(submitHanler).toHaveBeenCalledWith({login: mockLogin, password: mockPassword});
});
