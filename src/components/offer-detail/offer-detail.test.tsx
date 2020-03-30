import * as React from "react";
import {mount} from "enzyme";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space.js";
import OfferDetail from "./offer-detail";
import {OfferType, AuthStatus, FEATURES} from '../../consts';
import {Location, City, Owner, Offer, UserInfo} from '../../types';

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

const mockOffer: Offer = {
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


it(`OfferDetail spanshot`, () => {

  const store = mockStore({[NameSpace.USER]: {
    authStatus: AuthStatus.AUTH,
    authInfo: mockUserInfo,
    authError: null
  }});

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const offerDetailComponent = mount(<Provider store={store}><OfferDetail offer={mockOffer} /></Provider>, {attachTo: div});

  expect(offerDetailComponent.getDOMNode()).toMatchSnapshot();
});
