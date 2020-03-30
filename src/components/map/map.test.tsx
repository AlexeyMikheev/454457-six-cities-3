import * as React from 'react';
import {mount} from 'enzyme';
import Map from './map';
import {OfferType, FEATURES, ViewMode} from '../../consts';
import {Location, City, Owner, Offer} from '../../types';

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

const cityAmsterdam: City = {
  name: `Amsterdam`,
  location,
  center: location.center,
  zoom: location.zoom
};

const mockOffers: Offer[] = [
  {
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
  },
  {
    owner,
    location,
    city: cityAmsterdam,
    id: 2,
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
  },
];

it(`Map test (Main)`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const mapComponent = mount(<Map offers={mockOffers} activeOffer={mockOffers[0]} hoveredOffer={mockOffers[1]} currentCity={cityParis} viewMode={ViewMode.Main}/>, {attachTo: div});
  expect(mapComponent.getDOMNode()).toMatchSnapshot();
});

it(`Map test (Property)`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const mapComponent = mount(<Map offers={mockOffers} activeOffer={mockOffers[0]} hoveredOffer={mockOffers[1]} currentCity={cityParis} viewMode={ViewMode.Property}/>, {attachTo: div});
  expect(mapComponent.getDOMNode()).toMatchSnapshot();
});
