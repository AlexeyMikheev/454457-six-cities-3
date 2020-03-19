import React from "react";
import PropTypes from "prop-types";
import {OfferShape} from "../../settings.js";
import {getRatingPercents} from "../../utils.js";
import FavoriteButton from "../favorite-button/favorite-button.jsx";
import withButtonState from "../../hoks/with-button-state.jsx";
import {FavoriteButtonType} from "../../consts.js";

const ButtonWithButtonState = withButtonState(FavoriteButton);

const OfferDetail = ({offer}) => {
  const {isPremium, cost, isMarked, rating, name, type, roomsCount, membersCount, features} = offer;
  const ratingPercent = getRatingPercents(rating);

  return (
    <React.Fragment>
      {isPremium &&
          <div className="property__mark">
            <span>Premium</span>
          </div>
      }
      <div className="property__name-wrapper">
        <h1 className="property__name">
          {name}
        </h1>
        <ButtonWithButtonState viewType={FavoriteButtonType.PROPERTY} offerId={offer.id} isMarked={isMarked} />
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
    </React.Fragment>
  );
};

OfferDetail.propTypes = {
  offer: PropTypes.shape(OfferShape).isRequired
};

export default React.memo(OfferDetail);
