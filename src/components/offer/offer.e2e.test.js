import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Offer from "./offer.jsx";
import {OfferType, FEATURES, ViewMode} from "../../consts.js";

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

it(`Offer e2e (ViewMode.Main)`, () => {
  const headerClickHandler = jest.fn();
  const hoveredChangeHandler = jest.fn();

  const mockEvt = {preventDefault: () => {}};

  const placeComponent = shallow(<Offer offer={mockOffer} onHeaderClick={headerClickHandler} onHoveredChange={hoveredChangeHandler} viewMode={ViewMode.Main}/>);

  const placeHeader = placeComponent.find(`h2.place-card__name`);
  const placeCard = placeComponent.find(`article.place-card`);

  placeHeader.simulate(`click`, mockEvt);
  expect(headerClickHandler).toHaveBeenCalledTimes(1);
  expect(headerClickHandler).toHaveBeenCalledWith(mockOffer.id);

  placeCard.simulate(`mouseover`);
  expect(hoveredChangeHandler).toHaveBeenCalledTimes(1);
  expect(hoveredChangeHandler).toHaveBeenCalledWith(mockOffer.id);

  placeCard.simulate(`mouseleave`);
  expect(hoveredChangeHandler).toHaveBeenCalledTimes(2);
  expect(hoveredChangeHandler).toHaveBeenCalledWith(null);

});

it(`Offer e2e (ViewMode.Property)`, () => {
  const headerClickHandler = jest.fn();
  const hoveredChangeHandler = jest.fn();

  const mockEvt = {preventDefault: () => {}};

  const placeComponent = shallow(<Offer offer={mockOffer} onHeaderClick={headerClickHandler} viewMode={ViewMode.Property}/>);

  const placeHeader = placeComponent.find(`h2.place-card__name`);
  const placeCard = placeComponent.find(`article.place-card`);

  placeHeader.simulate(`click`, mockEvt);
  expect(headerClickHandler).toHaveBeenCalledTimes(1);
  expect(headerClickHandler).toHaveBeenCalledWith(mockOffer.id);

  placeCard.simulate(`mouseover`);
  expect(hoveredChangeHandler).toHaveBeenCalledTimes(0);

  placeCard.simulate(`mouseleave`);
  expect(hoveredChangeHandler).toHaveBeenCalledTimes(0);

});

it(`Offer e2e (ViewMode.Favorite)`, () => {
  const headerClickHandler = jest.fn();
  const hoveredChangeHandler = jest.fn();

  const mockEvt = {preventDefault: () => {}};

  const placeComponent = shallow(<Offer offer={mockOffer} onHeaderClick={headerClickHandler} viewMode={ViewMode.Favorite}/>);

  const placeHeader = placeComponent.find(`h2.place-card__name`);
  const placeCard = placeComponent.find(`article.place-card`);

  placeHeader.simulate(`click`, mockEvt);
  expect(headerClickHandler).toHaveBeenCalledTimes(1);
  expect(headerClickHandler).toHaveBeenCalledWith(mockOffer.id);

  placeCard.simulate(`mouseover`);
  expect(hoveredChangeHandler).toHaveBeenCalledTimes(0);

  placeCard.simulate(`mouseleave`);
  expect(hoveredChangeHandler).toHaveBeenCalledTimes(0);

});
