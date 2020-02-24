import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import {OfferShape, ReviewShape, CityShapre} from "../../settings.js";
import {ActionCreator} from "../../reducer.js";
import offersMoke from '../../mocks/offers.js';
import reviewsMocke from "../../mocks/reviews.js";
import citiesMocke from "../../mocks/cities.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.placeHeaderClickHandler = this.placeHeaderClickHandler.bind(this);
    this.cityClickHandler = this.cityClickHandler.bind(this);
  }

  componentDidMount() {
    this.props.setOffers(offersMoke);
    this.props.setReviews(reviewsMocke);
    this.props.setCities(citiesMocke);
  }

  placeHeaderClickHandler(offerId) {
    this.props.setCurrentOffer(offerId);
  }

  cityClickHandler(cityId) {
    const {selectedCity} = this.props;
    if (selectedCity && selectedCity.id !== cityId) {
      this.props.setCurrentCity(cityId);
    }
  }

  renderApp() {
    const {offers, cities, selectedCity} = this.props;
    return (
      <Main offers={offers} cities={cities} currentCity={selectedCity} onCityClick={this.cityClickHandler} onPlaceHeaderClick={this.placeHeaderClickHandler}/>
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
  offers: PropTypes.arrayOf(PropTypes.shape(OfferShape)),
  cities: PropTypes.arrayOf(PropTypes.shape(CityShapre)),
  selectedOffer: PropTypes.shape(OfferShape),
  selectedCity: PropTypes.shape(CityShapre),
  reviews: PropTypes.arrayOf(PropTypes.shape(ReviewShape)),
  cityHeaderClickHandler: PropTypes.func,
  setOffers: PropTypes.func.isRequired,
  setReviews: PropTypes.func.isRequired,
  setCities: PropTypes.func.isRequired,
  setCurrentOffer: PropTypes.func.isRequired,
  setCurrentCity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cities: state.cities,
  offers: state.currentOffers,
  selectedOffer: state.currentOffer,
  selectedCity: state.currentCity,
  reviews: state.reviews
});

const mapDispatchToProps = (dispatch) => ({
  setOffers(offers) {
    dispatch(ActionCreator.setOffers(offers));
  },
  setReviews(reviews) {
    dispatch(ActionCreator.setReviews(reviews));
  },
  setCities(cities) {
    dispatch(ActionCreator.setCities(cities));
  },
  setCurrentOffer(offerId) {
    dispatch(ActionCreator.setCurrentOffer(offerId));
  },
  setCurrentCity(cityId) {
    dispatch(ActionCreator.setCurrentCity(cityId));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
