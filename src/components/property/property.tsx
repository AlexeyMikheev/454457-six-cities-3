import * as React from "react";
import {connect} from "react-redux";
import {ViewMode, MAX_IMAGES_DISPLAY_COUNT, MAX_NEAR_DISPLAY_COUNT} from "../../consts";
import {Offer, Review as ReviewObectType, City, OfferHoveredChangeFunction, OfferChangeFunction, HoveredChangeArgType, CityChangeFunction} from "../../types";
import Comments from "../comments/comments";
import Offers from "../offers/offers";
import Map from "../map/map";
import OfferDetail from "../offer-detail/offer-detail";
import PropertyGallery from "../property-gallery/property-gallery";
import CommentForm from "../comment-form/comment-form";
import withFormState from "../../hoks/with-form-state/with-form-state";
import {getCurrentOfferId, getHoveredOfferId, getCurrentOffers, getCurrentCity, getNearOffers, getCurrentOffer, getHoveredOffer} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data.js";
import {isUserAuthorized} from "../../reducer/user/selectors.js";
import {getCommnets} from "../../reducer/comment/selectors.js";
import Header from "../header/header";

interface Props{
  match: {params: {offerId: string}};
  offerId: number;
  offer: Offer;
  hoveredOffer: Offer;
  reviews: ReviewObectType[];
  nearOffers: Offer[];
  currentCity: City;
  isAuthorized: boolean;
  setCurrentOffer: OfferChangeFunction;
  setHoveredOffer: OfferHoveredChangeFunction;
  setCurrentCity: CityChangeFunction;
  hoveredOfferId: HoveredChangeArgType;
  currentOfferId: number;
}

const CommentFormWithState = withFormState(CommentForm);

const Property: React.FC<Props> = (props) => {
  const {currentOfferId, hoveredOfferId, offer, reviews, nearOffers, hoveredOffer, currentCity, isAuthorized, match, setCurrentOffer, setHoveredOffer, setCurrentCity} = props;

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

  if (setCurrentCity && offer.cityName !== currentCity.name) {
    setCurrentCity(offer.cityName);
  }

  const {images, description} = offer;
  const {name: ownerName, avatar, isTrust} = offer.owner;

  const displayImages = images.slice(0, MAX_IMAGES_DISPLAY_COUNT);
  const displayNearOffers = nearOffers.slice(0, MAX_NEAR_DISPLAY_COUNT);

  const nearOffersContainer = nearOffers.length > 0 ? <Offers viewMode={ViewMode.Property} /> : `No places to stay available`;

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
                <Comments reviews={reviews} />
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
  setHoveredOffer: DataActionCreator.setHoveredOffer,
  setCurrentCity: DataActionCreator.setCurrentCity
};

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);

