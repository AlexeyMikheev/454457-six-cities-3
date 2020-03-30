import * as React from "react";
import {mount} from 'enzyme';
import LoginForm from "./login-form";

it(`Render Login`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const loginFormComponent = mount(<LoginForm email={``} password={``} onValueChanged={jest.fn()} onSubmitForm={jest.fn()}/>, {attachTo: div});

  expect(loginFormComponent.getDOMNode()).toMatchSnapshot();
});
