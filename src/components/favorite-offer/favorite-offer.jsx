import React from "react";
import PropTypes from "prop-types";
import {OfferShape} from '../../settings.js';
import {getRatingPercents} from '../../utils.js';
import {Link} from "react-router-dom";
import {AppRoute} from '../../consts.js';

export const FavoriteOffer = ({offer, onPlaceHeaderClick}) => {
  const {cost, rating, name, type, image} = offer;
  const ratingPercent = getRatingPercents(rating);

  return (
    <article key={offer.id} className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a xlinkHref="#">
          <img className="place-card__image" src={image} width="150" height="110" alt="Place image" />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{cost}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" onClick={onPlaceHeaderClick}>
          <Link to={`${AppRoute.OFFER}/${offer.id}`}>{name}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

FavoriteOffer.propTypes = {
  offer: PropTypes.shape(OfferShape).isRequired,
  onPlaceHeaderClick: PropTypes.func
};

export default React.memo(FavoriteOffer);
