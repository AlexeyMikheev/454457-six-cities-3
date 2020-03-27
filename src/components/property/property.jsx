import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ViewMode, MAX_IMAGES_DISPLAY_COUNT, MAX_NEAR_DISPLAY_COUNT} from "../../consts.js";
import {OfferShape, ReviewShape, CityShape} from "../../settings.js";
import Reviews from "../reviews/reviews.jsx";
import Offers from "../offers/offers.jsx";
import Map from "../map/map.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";
import PropertyGallery from "../property-gallery/property-gallery.jsx";
import CommentForm from "../comment-form/comment-form.jsx";
import withFormState from "../../hoks/with-form-state/with-form-state.jsx";
import {getCurrentOfferId, getHoveredOfferId, getCurrentOffers, getCurrentCity, getNearOffers, getCurrentOffer, getHoveredOffer} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data.js";
import {isUserAuthorized} from "../../reducer/user/selectors.js";
import {getCommnets} from "../../reducer/comment/selectors.js";
import Header from "../header/header.jsx";

const CommentFormWithState = withFormState(CommentForm);

const Property = ({currentOfferId, hoveredOfferId, offer, reviews, nearOffers, hoveredOffer, currentCity, isAuthorized, match, setCurrentOffer, setHoveredOffer}) => {

  const offerId = parseInt(match.params.offerId, 10);

  if (!offer || !currentOfferId || (currentOfferId !== offerId)) {
    setCurrentOffer(offerId);
  }

  if (hoveredOfferId) {
    setHoveredOffer(null);
  }

  if (!offer) {
    return (<React.Fragment></React.Fragment>);
  }

  const {images, description} = offer;
  const {name: ownerName, avatar, isTrust} = offer.owner;

  const displayImages = images.slice(0, MAX_IMAGES_DISPLAY_COUNT);
  const displayNearOffers = nearOffers.slice(0, MAX_NEAR_DISPLAY_COUNT);

  let nearOffersContainer = `No places to stay available`;

  if (nearOffers.length > 0) {
    nearOffersContainer = <Offers viewMode={ViewMode.Property} />;
  }

  return (
    <React.Fragment>
      <Header />
      <div className="page page--gray page--property">
        <section className="property">
          <div className="property__gallery-container container">
            <PropertyGallery images={displayImages} />
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <OfferDetail offer={offer} />
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${isTrust ? `property__avatar-wrapper--pro` : ``}`}>
                    <img className="property__avatar user__avatar" src={`/${avatar}`} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">{ownerName}</span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <Reviews reviews={reviews} />
                {isAuthorized && <CommentFormWithState />}
              </section>
            </div>
            <Map offers={displayNearOffers} activeOffer={offer} hoveredOffer={hoveredOffer} viewMode={ViewMode.Property} currentCity={currentCity}/>
          </div>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            {nearOffersContainer}
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

Property.propTypes = {
  match: PropTypes.object,
  offerId: PropTypes.number,
  offer: PropTypes.shape(OfferShape),
  hoveredOffer: PropTypes.shape(OfferShape),
  reviews: PropTypes.arrayOf(PropTypes.shape(ReviewShape)),
  nearOffers: PropTypes.arrayOf(PropTypes.shape(OfferShape)),
  currentCity: PropTypes.shape(CityShape),
  isAuthorized: PropTypes.bool.isRequired,
  setCurrentOffer: PropTypes.func.isRequired,
  setHoveredOffer: PropTypes.func,
  hoveredOfferId: PropTypes.number,
  currentOfferId: PropTypes.number,
};

const mapStateToProps = (state) => ({
  hoveredOfferId: getHoveredOfferId(state),
  currentOfferId: getCurrentOfferId(state),
  offers: getCurrentOffers(state),
  nearOffers: getNearOffers(state),
  offer: getCurrentOffer(state),
  hoveredOffer: getHoveredOffer(state),
  reviews: getCommnets(state),
  currentCity: getCurrentCity(state),
  isAuthorized: isUserAuthorized(state)
});

const mapDispatchToProps = {
  setCurrentOffer: DataOperation.setCurrentOffer,
  setHoveredOffer: DataActionCreator.setHoveredOffer
};

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);

