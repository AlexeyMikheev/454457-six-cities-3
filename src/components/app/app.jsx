import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import {OfferShape1, ReviewShape1} from "../../settings.js";
import {ActionCreator} from "../../reducer.js";
import offersMoke from '../../mocks/offers.js';
import reviewsMoke from "../../mocks/reviews.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.placeHeaderClickHandler = this.placeHeaderClickHandler.bind(this);
  }

  componentDidMount() {
    this.props.setOffers(offersMoke);
    this.props.setReviews(reviewsMoke);
  }

  placeHeaderClickHandler(offerId) {
    this.props.setCurrentOffer(offerId);
  }

  renderApp() {
    const {offers} = this.props;
    return (
      <Main offers={offers} onPlaceHeaderClick={this.placeHeaderClickHandler} />
    );
  }

  renderProperty(selectedOffer) {
    if (!selectedOffer) {
      return null;
    }

    const {offers, reviews} = this.props;

    const nearOffers = offers.filter((offer) => {
      return selectedOffer.id !== offer.id;
    });

    if (selectedOffer !== null) {
      return (
        <Property offer={selectedOffer} reviews={reviews} nearOffers={nearOffers} onPlaceHeaderClick={this.placeHeaderClickHandler} />
      );
    }
    return this.renderApp();
  }

  renderMain() {
    const {selectedOffer} = this.props;

    if (selectedOffer) {
      return (
        this.renderProperty(selectedOffer)
      );
    }
    return (
      this.renderApp()
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderMain()}
          </Route>
          <Route exact path="/dev-offer">
            {this.renderProperty()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(OfferShape1)),
  selectedOffer: PropTypes.shape(OfferShape1),
  reviews: PropTypes.arrayOf(PropTypes.shape(ReviewShape1)),
  cityHeaderClickHandler: PropTypes.func,
  setOffers: PropTypes.func.isRequired,
  setReviews: PropTypes.func.isRequired,
  setCurrentOffer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cities: state.cities,
  offers: state.currentOffers,
  selectedOffer: state.currentOffer,
  reviews: state.reviews
});

const mapDispatchToProps = (dispatch) => ({
  setOffers(offers) {
    dispatch(ActionCreator.setOffers(offers));
  },
  setReviews(reviews) {
    dispatch(ActionCreator.setReviews(reviews));
  },
  setCurrentOffer(offerId) {
    dispatch(ActionCreator.setCurrentOffer(offerId));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
