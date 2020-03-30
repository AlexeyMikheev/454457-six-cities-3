import * as React from 'react';
import {mount} from "enzyme";
import {FavoriteButton} from './favorite-button';
import {FavoriteButtonType} from '../../consts';


it(`FavoriteButton snapshot (PROPERTY)`, () => {

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const favoriteButton = mount(<FavoriteButton
    isAuthorized={true}
    isMarked={true}
    viewType={FavoriteButtonType.PROPERTY}
    offerId={1}
    setFavorite={jest.fn()}
  />, {attachTo: div});

  expect(favoriteButton).toMatchSnapshot();
});

it(`FavoriteButton snapshot (CARD)`, () => {

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const favoriteButton = mount(<FavoriteButton
    isAuthorized={true}
    isMarked={true}
    viewType={FavoriteButtonType.CARD}
    offerId={1}
    setFavorite={jest.fn()}
  />, {attachTo: div});

  expect(favoriteButton).toMatchSnapshot();
});
