import React from "react";
import PropTypes from "prop-types";
import {ViewMode, MAX_IMAGES_DISPLAY_COUNT, MAX_NEAR_DISPLAY_COUNT} from "../../consts.js";
import {OfferShape, ReviewShape} from "../../settings.js";
import Reviews from "../reviews/reviews.jsx";
import Offers from "../offers/offers.jsx";
import Map from "../map/map.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";

const Property = ({offer, reviews, nearOffers, onPlaceHeaderClick}) => {
  const {images} = offer;
  const {name: ownerName, avatar, description, isTrust} = offer.owner;

  const displayImages = images.slice(0, MAX_IMAGES_DISPLAY_COUNT);
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
            <OfferDetail offer={offer} />
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
          <Map offers={displayNearOffers} activeOffer={offer} viewMode={ViewMode.Property} />
        </div>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <Offers offers={displayNearOffers} viewMode={ViewMode.Property} onPlaceHeaderClick={onPlaceHeaderClick} />
        </section>
      </div>
    </React.Fragment>
  );
};

Property.propTypes = {
  offer: PropTypes.shape(OfferShape).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(ReviewShape)).isRequired,
  nearOffers: PropTypes.arrayOf(PropTypes.shape(OfferShape)).isRequired,
  onPlaceHeaderClick: PropTypes.func.isRequired
};

export default Property;
