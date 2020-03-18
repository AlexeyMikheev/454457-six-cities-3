import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {getRatingPercents} from '../../utils.js';
import {AppRoute} from '../../consts.js';
import {OfferShape} from '../../settings.js';

const Offer = ({offer, onPlaceHeaderClick, onPlaceCardMouseOver, onPlaceCardMouseLeave, setFavorite, isNearViewMode}) => {
  const {isPremium, cost, isMarked, rating, name, type, image} = offer;

  const ratingPercent = getRatingPercents(rating);

  return (

    <article className={`place-card ${ isNearViewMode ? `near-places__card` : `cities__place-card` }`} onMouseOver={onPlaceCardMouseOver} onMouseLeave={onPlaceCardMouseLeave}>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`place-card__image-wrapper ${ isNearViewMode ? `near-places__image-wrapper` : `cities__image-wrapper`}`}>
        <a xlinkHref="#">
          <img className="place-card__image" src={image} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{cost}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isMarked ? `place-card__bookmark-button--active` : ``}`} type="button" onClick={setFavorite}>
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

Offer.propTypes = {
  offer: PropTypes.shape(OfferShape).isRequired,
  onPlaceHeaderClick: PropTypes.func.isRequired,
  setFavorite: PropTypes.func.isRequired,
  onPlaceCardMouseOver: PropTypes.func.isRequired,
  onPlaceCardMouseLeave: PropTypes.func.isRequired,
  isNearViewMode: PropTypes.bool.isRequired
};

export default React.memo(Offer);
