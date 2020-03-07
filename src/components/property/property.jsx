import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ViewMode, MAX_IMAGES_DISPLAY_COUNT, MAX_NEAR_DISPLAY_COUNT, AuthStatus, AuthStatuses} from "../../consts.js";
import {OfferShape, ReviewShape, CityShape} from "../../settings.js";
import Reviews from "../reviews/reviews.jsx";
import Offers from "../offers/offers.jsx";
import Map from "../map/map.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";
import PropertyGallery from "../property-gallery/property-gallery.jsx";
import CommentForm from "../comment-form/comment-form.jsx";
import {getCurrentOffers, getCurrentCity, getNearOffers, getCurrentOffer, getHoveredOffer} from "../../reducer/data/selectors.js";
import {getAuthStatus} from "../../reducer/user/selectors.js";
import {getCommnets, getLoadingStatus} from "../../reducer/comment/selectors.js";
import {Operation as commentOperation} from "../../reducer/comment/comment.js";

const Property = ({offer, reviews, nearOffers, hoveredOffer, currentCity, authStatus, sendComment, isLoading}) => {
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
            <section className="property__reviews reviews">
              <Reviews reviews={reviews} />
              {authStatus === AuthStatus.AUTH && <CommentForm disabled={isLoading} onSubmit={(comment) => {
                sendComment(offer.id, comment);
              }}/>}
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
    </React.Fragment>
  );
};

Property.propTypes = {
  offer: PropTypes.shape(OfferShape).isRequired,
  hoveredOffer: PropTypes.shape(OfferShape),
  reviews: PropTypes.arrayOf(PropTypes.shape(ReviewShape)).isRequired,
  nearOffers: PropTypes.arrayOf(PropTypes.shape(OfferShape)).isRequired,
  currentCity: PropTypes.shape(CityShape),
  authStatus: PropTypes.oneOf(AuthStatuses).isRequired,
  sendComment: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  offers: getCurrentOffers(state),
  nearOffers: getNearOffers(state),
  offer: getCurrentOffer(state),
  hoveredOffer: getHoveredOffer(state),
  reviews: getCommnets(state),
  isLoading: getLoadingStatus(state),
  currentCity: getCurrentCity(state),
  authStatus: getAuthStatus(state)
});

const mapDispatchToProps = {
  sendComment: commentOperation.sendComment
};

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);

