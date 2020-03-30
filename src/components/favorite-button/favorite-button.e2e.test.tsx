import * as React from 'react';
import {shallow} from 'enzyme';
import {FavoriteButton} from './favorite-button';
import {FavoriteButtonType, FavoriteState} from '../../consts';


it(`FavoriteButton e2e (PROPERTY with isAuthorized)`, () => {

  const mockEvt = {preventDefault: jest.fn()};
  const mockOfferId = 1;
  const setFavorite = jest.fn();

  const favoriteButton = shallow(
      <FavoriteButton
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

  const mockEvt = {preventDefault: jest.fn()};
  const mockOfferId = 1;
  const setFavorite = jest.fn();

  const favoriteButton = shallow(
      <FavoriteButton
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

  const mockEvt = {preventDefault: jest.fn()};
  const mockOfferId = 1;
  const setFavorite = jest.fn();

  const favoriteButton = shallow(
      <FavoriteButton
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

  const mockEvt = {preventDefault: jest.fn()};
  const mockOfferId = 1;
  const setFavorite = jest.fn();

  const favoriteButton = shallow(
      <FavoriteButton
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
