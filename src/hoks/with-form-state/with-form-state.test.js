import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withFormState from "./with-form-state.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const MockComponent = () => <div />;
const WithFormState = withFormState(MockComponent);

it(`WithFormState LoginForm test`, () => {
  const wrapper = shallow(<WithFormState />);

  const evt = {
    preventDefault: jest.fn(),
    target: {
      name: `email`,
      value: `email@email.ru`
    }
  };

  expect(wrapper.props().email).toEqual(undefined);

  wrapper.props().onValueChanged(evt);

  expect(wrapper.props().email).toEqual(evt.target.value);
});

it(`WithFormState CommentForm test`, () => {
  const wrapper = shallow(<WithFormState />);

  const evt = {
    preventDefault: jest.fn(),
    target: {
      name: `rating`,
      value: `1`
    }
  };

  expect(wrapper.props().rating).toEqual(undefined);

  wrapper.props().onValueChanged(evt);

  expect(wrapper.props().rating).toEqual(evt.target.value);

  wrapper.props().onValuesReset();

  expect(wrapper.props().rating).toEqual(``);
});
