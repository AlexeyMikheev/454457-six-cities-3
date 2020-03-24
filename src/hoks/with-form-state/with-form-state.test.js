import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withFormState from "./with-form-state.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockeNumber = 1;

const mockeMessage = `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. `;

const MockComponent = () => <div />;
const WithFormState = withFormState(MockComponent);

it(`Should toggle boolean state`, () => {
  const wrapper = shallow(<WithFormState />);

  expect(wrapper.props().numeric).toEqual(undefined);
  expect(wrapper.props().text).toEqual(``);

  expect(wrapper.props().isFormValid).toEqual(false);

  wrapper.props().onNumericChanged(mockeNumber);
  expect(wrapper.props().numeric).toEqual(mockeNumber);

  wrapper.props().onTextChanged(mockeMessage);
  expect(wrapper.props().text).toEqual(mockeMessage);

  expect(wrapper.props().isFormValid).toEqual(true);
});
