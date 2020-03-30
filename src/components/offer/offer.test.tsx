import * as React from "react";
import {mount} from "enzyme";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from "../../history.js";
import NameSpace from "../../reducer/name-space.js";
import Offer from "./offer";
import {OfferType, FEATURES, ViewMode, AuthStatus} from '../../consts';
import {Location, City, Owner, Offer as OfferObjectType, UserInfo} from '../../types';

const mockStore = configureStore([]);

const owner: Owner = {
  id: 1,
  name: `Angelina`,
  avatar: `img/avatar-angelina.jpg`,
  isTrust: true
};

const location: Location = {
  latitude: 4.85309666406198,
  longitude: 52.3909553943508,
  zoom: 10,
  center: [4.85309666406198, 52.3909553943508]
};

const cityParis: City = {
  name: `Paris`,
  location,
  center: location.center,
  zoom: location.zoom
};

const mockOffer: OfferObjectType = {
  owner,
  location,
  city: cityParis,
  id: 1,
  isPremium: true,
  isMarked: false,
  cost: 120,
  rating: 4,
  name: `Beautiful & luxurious apartment at great location`,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
  roomsCount: 3,
  membersCount: 4,
  type: OfferType.APARTMENT,
  image: `img/apartment-01.jpg`,
  images: [
    `img/room.jpg`,
    `img/apartment-01.jpg`,
    `img/apartment-02.jpg`,
    `img/apartment-03.jpg`,
    `img/studio-01.jpg`,
    `img/apartment-01.jpg`,
  ],
  features: FEATURES,
  cityName: cityParis.name,
  center: location.center,
  zoom: location.zoom
};

const mockUserInfo: UserInfo = {
  [`avatar_url`]: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
  id: 1,
  [`is_pro`]: false,
  name: `Oliver.conner`,
};

it(`Offer snapshot (ViewMode.Main)`, () => {

  const store = mockStore({[NameSpace.USER]: {
    authStatus: AuthStatus.NO_AUTH,
    authInfo: null,
    authError: null
  }});

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const offerComment = mount(
      <Router history={history}>
        <Provider store={store}>
          <Offer offer={mockOffer} onHeaderClick={jest.fn()} onHoveredChange={jest.fn()} viewMode={ViewMode.Main}/>
        </Provider>
      </Router>, {attachTo: div});

  expect(offerComment.getDOMNode()).toMatchSnapshot();
});

it(`Offer snapshot (ViewMode.Property)`, () => {

  const store = mockStore({[NameSpace.USER]: {
    authStatus: AuthStatus.NO_AUTH,
    authInfo: null,
    authError: null
  }});

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const offerComment = mount(
      <Router history={history}>
        <Provider store={store}>
          <Offer offer={mockOffer} onHeaderClick={jest.fn()} onHoveredChange={null} viewMode={ViewMode.Property}/>
        </Provider>
      </Router>, {attachTo: div});

  expect(offerComment.getDOMNode()).toMatchSnapshot();
});

it(`Offer snapshot (ViewMode.Favorite)`, () => {

  const store = mockStore({[NameSpace.USER]: {
    authStatus: AuthStatus.AUTH,
    authInfo: mockUserInfo,
    authError: null
  }});

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const offerComment = mount(
      <Router history={history}>
        <Provider store={store}>
          <Offer offer={mockOffer} onHeaderClick={jest.fn()} onHoveredChange={null} viewMode={ViewMode.Favorite}/>
        </Provider>
      </Router>, {attachTo: div});

  expect(offerComment.getDOMNode()).toMatchSnapshot();
});

