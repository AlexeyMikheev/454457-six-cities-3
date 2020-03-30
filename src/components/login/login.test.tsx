import * as React from "react";
import {mount} from 'enzyme';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {AuthStatus} from "../../consts";
import NameSpace from "../../reducer/name-space.js";
import Login from "./login";
import {Router} from "react-router-dom";
import history from "../../history.js";

const mockStore = configureStore([]);

it(`Render Login`, () => {

  const store = mockStore({
    [NameSpace.USER]: {
      authStatus: AuthStatus.NO_AUTH,
      authInfo: null,
      authError: null
    }
  });

  const loginComponent = mount(
      <Router history={history}>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>);

  expect(loginComponent.getDOMNode()).toMatchSnapshot();
});
