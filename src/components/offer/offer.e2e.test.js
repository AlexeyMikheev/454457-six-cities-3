import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Offer from "./offer.jsx";
import {OfferType, FEATURES} from "../../consts.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const mock = {
  id: 1,
  isPremium: true,
  cost: 120,
  isMarked: false,
  rating: 4,
  name: `Beautiful & luxurious apartment at great location`,
  type: OfferType.APARTMENT,
  image: `img/apartment-01.jpg`,
  roomsCount: 3,
  membersCount: 4,
  images: [
    `img/room.jpg`,
    `img/apartment-01.jpg`,
    `img/apartment-02.jpg`,
    `img/apartment-03.jpg`,
    `img/studio-01.jpg`,
    `img/apartment-01.jpg`,
  ],
  features: FEATURES,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
  owner: {
    id: 1,
    name: `Angelina`,
    avatar: `img/avatar-angelina.jpg`,
    isTrust: true
  },
  cityId: 1,
  lonlat: [52.3909553943508, 4.85309666406198]
};

it(`Should offer click, mouseenter, mouseleave`, () => {
  const onPlaceHeaderClick = jest.fn();
  const onPlaceCardMouseOver = jest.fn();
  const onPlaceCardMouseLeave = jest.fn();

  const placeComponent = shallow(<Offer offer={mock} onPlaceHeaderClick={onPlaceHeaderClick} onPlaceCardMouseOver={onPlaceCardMouseOver} onPlaceCardMouseLeave={onPlaceCardMouseLeave} isNearViewMode={false}/>);

  const placeHeader = placeComponent.find(`h2.place-card__name`);
  const placeCard = placeComponent.find(`article.place-card`);

  placeHeader.simulate(`click`);
  expect(onPlaceHeaderClick).toHaveBeenCalledTimes(1);

  placeCard.simulate(`mouseover`);
  expect(onPlaceCardMouseOver).toHaveBeenCalledTimes(1);

  placeCard.simulate(`mouseleave`);
  expect(onPlaceCardMouseLeave).toHaveBeenCalledTimes(1);

});
