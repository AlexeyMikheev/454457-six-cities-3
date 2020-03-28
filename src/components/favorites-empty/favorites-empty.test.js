import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from "../../history.js";
import FavoritesEmpty from "./favorites-empty.jsx";
import NameSpace from "../../reducer/name-space.js";
import {AuthStatus} from '../../consts.js';

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

it(`FavoritesEmpty snapshot`, () => {

  const store = mockStore({
    [NameSpace.USER]: {
      authStatus: AuthStatus.NO_AUTH,
      authInfo: null,
      authError: null
    }
  });

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const favoritesEmptyComponent = mount(
      <Router history={history}>
        <Provider store={store}>
          <FavoritesEmpty />
        </Provider>
      </Router>,
      {attachTo: div});

  expect(favoritesEmptyComponent.getDOMNode()).toMatchSnapshot();
});
