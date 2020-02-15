import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";
import {OfferShape} from "../../settings.js";
import offersMock from "../../mocks/offers.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._placeHeaderClickHandler = this._placeHeaderClickHandler.bind(this);

    this.state = {
      value: offersMock[0]
    };
  }

  _placeHeaderClickHandler(offerId) {
    this.setState({selectedOfferId: offerId});
  }

  _renderApp() {
    const {offers} = this.props;

    return (
      <Main offers={offers} onPlaceHeaderClick={this._placeHeaderClickHandler}/>
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
  offers: PropTypes.arrayOf(PropTypes.shape(OfferShape)).isRequired
};


export default App;
