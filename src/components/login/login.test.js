import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {AuthStatus} from "../../consts.js";
import NameSpace from "../../reducer/name-space.js";
import Login from "./login.jsx";
import {BrowserRouter} from "react-router-dom";

const mockStore = configureStore([]);

it(`Render Login`, () => {

  const store = mockStore({
    [NameSpace.USER]: {
      authStatus: AuthStatus.NO_AUTH,
      authInfo: null,
      authError: null
    }
  });

  const tree = renderer
      .create(
          <BrowserRouter>
            <Provider store={store}>
              <Login onSubmit={() => {}} error={`Error auth`} />
            </Provider>
          </BrowserRouter>)
      .toJSON();
  expect(tree).toMatchSnapshot();
});
