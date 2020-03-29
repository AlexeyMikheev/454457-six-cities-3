import React from 'react';
import renderer from 'react-test-renderer';
import {FavoriteButton} from './favorite-button.jsx';
import {FavoriteButtonType} from '../../consts.js';


it(`FavoriteButton snapshot (PROPERTY)`, () => {

  const favoriteButton = renderer
    .create(
        <FavoriteButton isFormValid={true}
          isAuthorized={true}
          isMarked={true}
          viewType={FavoriteButtonType.PROPERTY}
          offerId={1}
          setFavorite={jest.fn()}
        />
    ).toJSON();
  expect(favoriteButton).toMatchSnapshot();
});

it(`FavoriteButton snapshot (CARD)`, () => {

  const commentForm = renderer
      .create(
          <FavoriteButton isFormValid={true}
            isAuthorized={true}
            isMarked={true}
            viewType={FavoriteButtonType.CARD}
            offerId={1}
            setFavorite={jest.fn()}
          />
      ).toJSON();
  expect(commentForm).toMatchSnapshot();
});
