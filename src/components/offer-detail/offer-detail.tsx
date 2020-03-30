import * as React from "react";
import {Offer} from "../../types";
import {getRatingPercents} from "../../utils.js";
import FavoriteButton from "../favorite-button/favorite-button";
import {FavoriteButtonType} from "../../consts";

interface Props {
  offer: Offer;
}

const OfferDetail: React.FC<Props> = ({offer}) => {
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
        <FavoriteButton viewType={FavoriteButtonType.PROPERTY} offerId={offer.id} isMarked={isMarked} />
      </div>
      <div className="property__rating rating">
        <div className="property__stars rating__stars">
          <span style={{width: `${ratingPercent}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="property__rating-value rating__value">{rating}</span>
      </div>
      <ul className="property__features">
        {
          type && <li className="property__feature property__feature--entire">{type}</li>
        }
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

export default React.memo(OfferDetail);
