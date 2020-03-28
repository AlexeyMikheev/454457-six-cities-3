import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {FavoriteButton} from './favorite-button.jsx';
import {FavoriteButtonType, FavoriteState} from '../../consts.js';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`FavoriteButton e2e (PROPERTY with isAuthorized)`, () => {

  const mockEvt = {preventDefault: () => {}};
  const mockOfferId = 1;
  const setFavorite = jest.fn();

  const favoriteButton = shallow(
      <FavoriteButton isFormValid={true}
        isAuthorized={true}
        isMarked={true}
        viewType={FavoriteButtonType.PROPERTY}
        offerId={mockOfferId}
        setFavorite={setFavorite} />
  );

  const button = favoriteButton.find(`button.property__bookmark-button`);

  button.simulate(`click`, mockEvt);
  expect(setFavorite).toHaveBeenCalledTimes(1);
  expect(setFavorite).toHaveBeenCalledWith(mockOfferId, FavoriteState.UNMARKED);
});

it(`FavoriteButton e2e (PROPERTY withOut isAuthorized)`, () => {

  const mockEvt = {preventDefault: () => {}};
  const mockOfferId = 1;
  const setFavorite = jest.fn();

  const favoriteButton = shallow(
      <FavoriteButton isFormValid={true}
        isAuthorized={false}
        isMarked={true}
        viewType={FavoriteButtonType.PROPERTY}
        offerId={mockOfferId}
        setFavorite={setFavorite} />
  );

  const button = favoriteButton.find(`button.property__bookmark-button`);

  button.simulate(`click`, mockEvt);
  expect(setFavorite).toHaveBeenCalledTimes(0);
});

it(`FavoriteButton e2e (CARD with isAuthorized)`, () => {

  const mockEvt = {preventDefault: () => {}};
  const mockOfferId = 1;
  const setFavorite = jest.fn();

  const favoriteButton = shallow(
      <FavoriteButton isFormValid={true}
        isAuthorized={true}
        isMarked={true}
        viewType={FavoriteButtonType.CARD}
        offerId={mockOfferId}
        setFavorite={setFavorite} />
  );

  const button = favoriteButton.find(`button.place-card__bookmark-button`);

  button.simulate(`click`, mockEvt);
  expect(setFavorite).toHaveBeenCalledTimes(1);
  expect(setFavorite).toHaveBeenCalledWith(mockOfferId, FavoriteState.UNMARKED);
});

it(`FavoriteButton e2e (CARD withOut isAuthorized)`, () => {

  const mockEvt = {preventDefault: () => {}};
  const mockOfferId = 1;
  const setFavorite = jest.fn();

  const favoriteButton = shallow(
      <FavoriteButton isFormValid={true}
        isAuthorized={false}
        isMarked={true}
        viewType={FavoriteButtonType.CARD}
        offerId={mockOfferId}
        setFavorite={setFavorite} />
  );

  const button = favoriteButton.find(`button.place-card__bookmark-button`);

  button.simulate(`click`, mockEvt);
  expect(setFavorite).toHaveBeenCalledTimes(0);
});
