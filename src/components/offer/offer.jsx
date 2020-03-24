import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {getRatingPercents} from '../../utils.js';
import {AppRoute, ViewMode, VIEWMODES} from '../../consts.js';
import {OfferShape} from '../../settings.js';
import FavoriteButton from "../favorite-button/favorite-button.jsx";
import {FavoriteButtonType} from "../../consts.js";

const renderOfferContent = (offer, onPlaceHeaderClick, imagesCardClass, infoCardClass = ``) => {
  const {cost, isMarked, rating, name, type, image} = offer;

  const ratingPercent = getRatingPercents(rating);

  return (
    <React.Fragment>
      <div className={`place-card__image-wrapper ${imagesCardClass}`}>
        <a xlinkHref="#">
          <img className="place-card__image" src={image} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className={`place-card__info ${infoCardClass}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{cost}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton viewType={FavoriteButtonType.CARD} offerId={offer.id} isMarked={isMarked} />
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
    </React.Fragment>
  );
};

const renderMainOfferContent = (offer, onPlaceHeaderClick, onPlaceCardMouseOver, onPlaceCardMouseLeave) => {
  const {isPremium} = offer;
  return (
    <article className="place-card cities__place-card" onMouseOver={onPlaceCardMouseOver} onMouseLeave={onPlaceCardMouseLeave}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      }
      {
        renderOfferContent(offer, onPlaceHeaderClick, `cities__image-wrapper`)
      }
    </article>
  );
};

const renderPropertyOfferContent = (offer, onPlaceHeaderClick) => {
  const {isPremium} = offer;
  return (
    <article className="place-card near-places__card">
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      }
      {
        renderOfferContent(offer, onPlaceHeaderClick, `near-places__image-wrapper`)
      }
    </article>
  );
};

const renderFavoriteOfferContent = (offer, onPlaceHeaderClick) => {
  return (
    <article className="place-card favorites__card">
      {
        renderOfferContent(offer, onPlaceHeaderClick, `favorites__image-wrapper`, `favorites__card-info`)
      }
    </article>
  );
};

const Offer = ({offer, onPlaceHeaderClick, onPlaceCardMouseOver, onPlaceCardMouseLeave, viewMode}) => {

  switch (viewMode) {
    case ViewMode.Main:
      return (
        renderMainOfferContent(offer, onPlaceHeaderClick, onPlaceCardMouseOver, onPlaceCardMouseLeave)
      );
    case ViewMode.Property:
      return (
        renderPropertyOfferContent(offer, onPlaceHeaderClick)
      );
    case ViewMode.Favorite:
      return (
        renderFavoriteOfferContent(offer, onPlaceHeaderClick)
      );
    default: return null;
  }
};

// const Offer = ({offer, onPlaceHeaderClick, onPlaceCardMouseOver, onPlaceCardMouseLeave, viewMode}) => {
//   const {isPremium, cost, isMarked, rating, name, type, image} = offer;

//   const ratingPercent = getRatingPercents(rating);

//   const isNearViewMode = viewMode === ViewMode.Property;

//   return (

//     <article className={`place-card ${ isNearViewMode ? `near-places__card` : `cities__place-card` }`} onMouseOver={onPlaceCardMouseOver} onMouseLeave={onPlaceCardMouseLeave}>
//       {isPremium &&
//         <div className="place-card__mark">
//           <span>Premium</span>
//         </div>
//       }
//       <div className={`place-card__image-wrapper ${ isNearViewMode ? `near-places__image-wrapper` : `cities__image-wrapper`}`}>
//         <a xlinkHref="#">
//           <img className="place-card__image" src={image} width="260" height="200" alt="Place image" />
//         </a>
//       </div>
//       <div className="place-card__info">
//         <div className="place-card__price-wrapper">
//           <div className="place-card__price">
//             <b className="place-card__price-value">&euro;{cost}</b>
//             <span className="place-card__price-text">&#47;&nbsp;night</span>
//           </div>
//           <ButtonWithButtonState viewType={FavoriteButtonType.CARD} offerId={offer.id} isMarked={isMarked} />
//         </div>
//         <div className="place-card__rating rating">
//           <div className="place-card__stars rating__stars">
//             <span style={{width: `${ratingPercent}%`}}></span>
//             <span className="visually-hidden">Rating</span>
//           </div>
//         </div>
//         <h2 className="place-card__name" onClick={onPlaceHeaderClick}>
//           <Link to={`${AppRoute.OFFER}/${offer.id}`}>{name}</Link>
//         </h2>
//         <p className="place-card__type">{type}</p>
//       </div>
//     </article>
//   );
// };

Offer.propTypes = {
  offer: PropTypes.shape(OfferShape).isRequired,
  onPlaceHeaderClick: PropTypes.func,
  onPlaceCardMouseOver: PropTypes.func,
  onPlaceCardMouseLeave: PropTypes.func,
  viewMode: PropTypes.oneOf(VIEWMODES).isRequired
};

export default React.memo(Offer);
