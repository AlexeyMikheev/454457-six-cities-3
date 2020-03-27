import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Offer from "./offer.jsx";
import {OfferType, FEATURES, ViewMode} from '../../consts.js';
import {Router} from "react-router-dom";
import history from "../../history.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const owner = {
  id: 1,
  name: `Angelina`,
  avatar: `img/avatar-angelina.jpg`,
  isTrust: true
};

const location = {
  latitude: 4.85309666406198,
  longitude: 52.3909553943508,
  zoom: 10,
  center: [4.85309666406198, 52.3909553943508]
};

const cityParis = {
  name: `Paris`,
  location,
  center: location.center,
  zoom: location.zoom
};

const mockOffer = {
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
it(`Offer snapshot (ViewMode.Main)`, () => {

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const offerComment = mount(
      <Router history={history}>
        <Offer offer={mockOffer} onHeaderClick={() => {}} onHoveredChange={() => {}} viewMode={ViewMode.Main}/>
      </Router>, {attachTo: div});

  expect(offerComment.getDOMNode()).toMatchSnapshot();
});

it(`Offer snapshot (ViewMode.Property)`, () => {

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const offerComment = mount(
      <Router history={history}>
        <Offer offer={mockOffer} onHeaderClick={() => {}} onHoveredChange={() => {}} viewMode={ViewMode.Property}/>
      </Router>, {attachTo: div});

  expect(offerComment.getDOMNode()).toMatchSnapshot();
});

it(`Offer snapshot (ViewMode.Favorite)`, () => {

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const offerComment = mount(
      <Router history={history}>
        <Offer offer={mockOffer} onHeaderClick={() => {}} onHoveredChange={() => {}} viewMode={ViewMode.Favorite}/>
      </Router>, {attachTo: div});

  expect(offerComment.getDOMNode()).toMatchSnapshot();
});

