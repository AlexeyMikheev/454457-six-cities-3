import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Offer from "./offer.jsx";
import {OfferType} from "../../consts.js";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should welcome button be pressed`, () => {

  const offer = {
    id: 1,
    isPremium: true,
    cost: 120,
    isMarked: false,
    rating: 4,
    name: `Beautiful & luxurious apartment at great location`,
    type: OfferType.APARTMENT,
    image: `img/apartment-01.jpg`
  };

  const onPlaceHeaderClick = jest.fn();

  const placeComponent = shallow(<Offer offer={offer} onPlaceHeaderClick={onPlaceHeaderClick}/>);

  const placeHeader = placeComponent.find(`h2.place-card__name`);

  placeHeader.simulate(`click`);

  expect(onPlaceHeaderClick).toHaveBeenCalledTimes(1);
});
