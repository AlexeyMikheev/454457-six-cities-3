import * as React from "react";
import {shallow} from "enzyme";
import withFormState from "./with-form-state";

const MockComponent = () => <div />;
const WithFormState = withFormState(MockComponent);

it(`WithFormState LoginForm test`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const withFormStateComponent = shallow(<WithFormState />, {attachTo: div});

  const evt = {
    preventDefault: jest.fn(),
    target: {
      name: `email`,
      value: `email@email.ru`
    }
  };

  expect(withFormStateComponent.props().email).toEqual(undefined);

  withFormStateComponent.props().onValueChanged(evt);

  expect(withFormStateComponent.props().email).toEqual(evt.target.value);
});

it(`WithFormState CommentForm test`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const withFormStateComponent = shallow(<WithFormState />, {attachTo: div});

  const evt = {
    preventDefault: jest.fn(),
    target: {
      name: `rating`,
      value: `1`
    }
  };

  expect(withFormStateComponent.props().rating).toEqual(undefined);

  withFormStateComponent.props().onValueChanged(evt);

  expect(withFormStateComponent.props().rating).toEqual(evt.target.value);

  withFormStateComponent.props().onValuesReset();

  expect(withFormStateComponent.props().rating).toEqual(``);
});
