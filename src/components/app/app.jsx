import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import {OfferShape, ReviewShape} from "../../settings.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.placeHeaderClickHandler = this.placeHeaderClickHandler.bind(this);

    this.state = {selectedOfferId: undefined};
  }

  placeHeaderClickHandler(offerId) {
    this.setState({selectedOfferId: offerId});
  }

  renderApp() {
    const {offers} = this.props;
    return (
      <Main offers={offers} onPlaceHeaderClick={this.placeHeaderClickHandler} />
    );
  }

  renderProperty() {
    if (!this.state.selectedOfferId) {
      return null;
    }

    const {offers, reviews} = this.props;

    const offer = offers.find((item) => {
      return item.id === this.state.selectedOfferId;
    });

    if (offer !== null) {
      return (
        <Property offer={offer} reviews={reviews} nearOffers={offers} onPlaceHeaderClick={this.placeHeaderClickHandler} />
      );
    }
    return this.renderApp();
  }

  renderMain() {
    if (this.state.selectedOfferId) {
      return (
        this.renderProperty()
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
  offers: PropTypes.arrayOf(PropTypes.shape(OfferShape)).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(ReviewShape)).isRequired,
};


export default App;
