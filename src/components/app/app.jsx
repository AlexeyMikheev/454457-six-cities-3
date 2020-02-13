import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";
import {OfferType} from "../../consts.js";
import offersMock from "../../mocks/offers.JS";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: offersMock[0]
    };
  }

  _renderApp() {
    const {offers} = this.props;

    return (
      <Main offers={offers} />
    );
  }

  _renderOfferDetail() {
    const offer = this.state.value;

    if (offer !== null) {
      return (
        <OfferDetail offer={offer} />
      );
    }
    return this._renderApp();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-offer">
            {this._renderOfferDetail()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    cost: PropTypes.number.isRequired,
    isMarked: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([OfferType.APARTMENT, OfferType.PRIVATE_ROOM]).isRequired,
    image: PropTypes.string.isRequired
  })).isRequired
};


export default App;
