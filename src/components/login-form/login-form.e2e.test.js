import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoginForm from "./login-form.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


it(`LoginForm e2e`, () => {

  const mockLogin = `login`;
  const mockPassword = `password`;
  const mockEvt = {preventDefault: () => {}};

  const submitHandler = jest.fn();
  const valueChangedHandler = jest.fn();

  const loginComponent = shallow(<LoginForm email={mockLogin} password={mockPassword} onSubmitForm={submitHandler} onValueChanged={valueChangedHandler} error={`Error auth`}/>);

  const form = loginComponent.find(`form.login__form`);

  const login = form.find(`input.login__input[name='email']`);

  login.simulate(`change`, mockLogin);

  expect(valueChangedHandler).toHaveBeenCalledTimes(1);
  expect(valueChangedHandler).toHaveBeenCalledWith(mockLogin);

  const password = form.find(`input.login__input[name='password']`);

  password.simulate(`change`, mockPassword);

  expect(valueChangedHandler).toHaveBeenCalledTimes(2);
  expect(valueChangedHandler).toHaveBeenCalledWith(mockPassword);

  form.simulate(`submit`, mockEvt);
  expect(submitHandler).toHaveBeenCalledTimes(1);
  expect(submitHandler).toHaveBeenCalledWith({login: mockLogin, password: mockPassword});
});
