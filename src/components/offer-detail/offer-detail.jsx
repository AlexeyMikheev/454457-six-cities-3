import React from "react";
import PropTypes from "prop-types";
import {OfferType, FEATURES} from "../../consts.js";

const OfferDetail = ({offer}) => {
  const {isPremium, cost, isMarked, rating, name, type, roomsCount, membersCount, features, images} = offer;

  return (
    <section className="property">
      <div className="property__gallery-container container">
        <div className="property__gallery">
          {images.map((imageSrc, i) => (
            <div key={imageSrc + i} className="property__image-wrapper">
              <img className="property__image" src={imageSrc} alt="Photo studio" />
            </div>
          ))}
        </div>
      </div>
      <div className="property__container container">
        <div className="property__wrapper">
          {isPremium &&
            <div className="property__mark">
              <span>Premium</span>
            </div>
          }
          <div className="property__name-wrapper">
            <h1 className="property__name">
              {name}
            </h1>
            <button className={`place-card__bookmark-button button ${isMarked ? `place-card__bookmark-button--active` : ``}`} type="button">
              <svg className="property__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="property__rating rating">
            <div className="property__stars rating__stars">
              <span style={{width: `${rating}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="property__rating-value rating__value">4.8</span>
          </div>
          <ul className="property__features">
            <li className="property__feature property__feature--entire">
              {type}
            </li>
            <li className="property__feature property__feature--bedrooms">
              {roomsCount} Bedrooms
            </li>
            <li className="property__feature property__feature--adults">
              Max {membersCount} adults
            </li>
          </ul>
          <div className="property__price">
            <b className="property__price-value">&euro;{cost}</b>
            <span className="property__price-text">&nbsp;night</span>
          </div>
          <div className="property__inside">
            <h2 className="property__inside-title">What&apos;s inside</h2>
            <ul className="property__inside-list">
              {features.map((feature, i) => (
                <li key={ feature + i} className="property__inside-item">{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

OfferDetail.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    cost: PropTypes.number.isRequired,
    isMarked: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([OfferType.APARTMENT, OfferType.PRIVATE_ROOM]).isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired),
    roomsCount: PropTypes.number.isRequired,
    membersCount: PropTypes.number.isRequired,
    features: PropTypes.arrayOf(PropTypes.oneOf(FEATURES)).isRequired
  }).isRequired,
};

export default OfferDetail;
