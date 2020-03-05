import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import {OfferShape, ReviewShape, CityShape} from "../../settings.js";
import {ActionCreator} from "../../reducer.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.placeHeaderClickHandler = this.placeHeaderClickHandler.bind(this);
    this.cityClickHandler = this.cityClickHandler.bind(this);
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
    return (
      <div className="page page--gray page--main">
        <Main/>
      </div>
    );
  }

  renderProperty(selectedOffer) {
    if (!selectedOffer) {
      return null;
    }

    if (selectedOffer !== null) {
      return (
        <Property />
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
  cities: PropTypes.arrayOf(PropTypes.shape(CityShape)),
  selectedOffer: PropTypes.shape(OfferShape),
  selectedCity: PropTypes.shape(CityShape),
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

const mapDispatchToProps = {
  setOffers: ActionCreator.setOffers,
  setReviews: ActionCreator.setReviews,
  setCities: ActionCreator.setCities,
  setCurrentOffer: ActionCreator.setCurrentOffer,
  setCurrentCity: ActionCreator.setCurrentCity
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
