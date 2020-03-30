import * as React from "react";
import {shallow} from "enzyme";
import withBooleanState from "./with-boolean-state";

const MockComponent = () => <div />;
const WithBooleanState = withBooleanState(MockComponent);

it(`Should toggle boolean state`, () => {
  const wrapper = shallow(<WithBooleanState />);

  expect(wrapper.props().isToggled).toEqual(false);

  wrapper.props().onToggleChange();

  expect(wrapper.props().isToggled).toEqual(true);
});
