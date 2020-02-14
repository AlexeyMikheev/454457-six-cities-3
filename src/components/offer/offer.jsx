import React from 'react';
import PropTypes from "prop-types";
import {OFFERTYPES, MAX_RATING} from '../../consts.js';

const Offer = ({offer, onPlaceHeaderClick, onPlaceCardMouseEnter, onPlaceCardMouseLeave}) => {
  const {isPremium, cost, isMarked, rating, name, type, image} = offer;

  const ratingPercent = Math.floor(rating) * 100 / MAX_RATING;

  return (

    <article className="cities__place-card place-card" onMouseEnter={ () => {
      onPlaceCardMouseEnter(offer);
    }} onMouseLeave={ () => {
      onPlaceCardMouseLeave(null);
    }}>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
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
          <button className={`place-card__bookmark-button button ${isMarked ? `place-card__bookmark-button--active` : ``}`} type="button">
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
        <h2 className="place-card__name" onClick={() => {
          onPlaceHeaderClick(offer);
        }}>
          <a href="#">{name}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

Offer.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    cost: PropTypes.number.isRequired,
    isMarked: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(OFFERTYPES).isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onPlaceHeaderClick: PropTypes.func.isRequired,
  onPlaceCardMouseEnter: PropTypes.func.isRequired,
  onPlaceCardMouseLeave: PropTypes.func.isRequired,
};

export default Offer;
