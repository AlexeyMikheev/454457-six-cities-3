import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withBooleanState from "./with-boolean-state.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const MockComponent = () => <div />;
const WithBooleanState = withBooleanState(MockComponent);

it(`Should toggle boolean state`, () => {
  const wrapper = shallow(<WithBooleanState />);

  expect(wrapper.props().isToggled).toEqual(false);

  wrapper.props().onToggleChange();

  expect(wrapper.props().isToggled).toEqual(true);
});
