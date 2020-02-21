import React from "react";
import PropTypes from "prop-types";
import {ViewMode, MAX_IMAGES_DISPLAY_COUNT, MAX_NEAR_DISPLAY_COUNT} from "../../consts.js";
import {OfferShape, ReviewShape} from "../../settings.js";
import {getRatingPercents} from "../../utils.js";
import Reviews from "../reviews/reviews.jsx";
import Offers from "../offers/offers.jsx";
import Map from "../map/map.jsx";

const property = ({offer, reviews, nearOffers, onPlaceHeaderClick}) => {
  const {isPremium, cost, isMarked, rating, name, type, roomsCount, membersCount, features, images} = offer;
  const {name: ownerName, avatar, description, isTrust} = offer.owner;

  const displayImages = images.slice(0, MAX_IMAGES_DISPLAY_COUNT);
  const ratingPercent = getRatingPercents(rating);
  const displayNearOffers = nearOffers.slice(0, MAX_NEAR_DISPLAY_COUNT);

  return (
    <React.Fragment>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {displayImages.map((imageSrc, i) => (
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
              <button className={`property__bookmark-button button ${isMarked ? `place-card__bookmark-button--active` : ``}`} type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${ratingPercent}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
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
                  <li key={feature + i} className="property__inside-item">{feature}</li>
                ))}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className={`property__avatar-wrapper user__avatar-wrapper ${ isTrust ? `property__avatar-wrapper--pro` : ``}`}>
                  <img className="property__avatar user__avatar" src={avatar} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">{ownerName}</span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {description}
                </p>
              </div>
            </div>
            <Reviews reviews={reviews} />
          </div>
          <Map offers={displayNearOffers} activeOffer={offer} viewMode={ViewMode.Near} />
        </div>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <Offers offers={displayNearOffers} viewMode={ViewMode.Near} onPlaceHeaderClick={onPlaceHeaderClick} />
        </section>
      </div>
    </React.Fragment>
  );
};

property.propTypes = {
  offer: PropTypes.shape(OfferShape).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(ReviewShape)).isRequired,
  nearOffers: PropTypes.arrayOf(PropTypes.shape(OfferShape)).isRequired,
  onPlaceHeaderClick: PropTypes.func.isRequired
};

export default property;
