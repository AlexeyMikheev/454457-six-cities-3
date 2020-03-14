import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {AuthStatus} from "../../consts.js";
import NameSpace from "../../reducer/name-space.js";
import Login from "./login.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

it(`Should login submit`, () => {

  const store = mockStore({
    [NameSpace.USER]: {
      authStatus: AuthStatus.NO_AUTH,
      authInfo: null,
      authError: null
    }
  });

  const onSubmitHanler = jest.fn();
  const loginComponent = mount(<Provider store={store}><Login onSubmit={onSubmitHanler} error={`Error auth`}/></Provider>);

  const form = loginComponent.find(`form.login__form`);

  form.simulate(`submit`, {preventDefault: () => {}});
  expect(onSubmitHanler).toHaveBeenCalledTimes(1);
});
