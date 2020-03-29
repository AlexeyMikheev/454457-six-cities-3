import React from "react";
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginForm from "./login-form.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Render Login`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const loginFormComponent = mount(<LoginForm onValueChanged={jest.fn()} onSubmitForm={jest.fn()}/>, {attachTo: div});

  expect(loginFormComponent.getDOMNode()).toMatchSnapshot();
});
