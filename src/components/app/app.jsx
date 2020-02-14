import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";
import {OFFERTYPES, FEATURES} from "../../consts.js";
import offersMock from "../../mocks/offers.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._placeHeaderClickHandler = this._placeHeaderClickHandler.bind(this);

    this.state = {
      value: offersMock[0]
    };
  }

  _placeHeaderClickHandler(offer) {
    this.setState({value: offer});
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
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    cost: PropTypes.number.isRequired,
    isMarked: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(OFFERTYPES).isRequired,
    image: PropTypes.string.isRequired,
    roomsCount: PropTypes.number.isRequired,
    membersCount: PropTypes.number.isRequired,
    features: PropTypes.arrayOf(PropTypes.oneOf(FEATURES)).isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      isTrust: PropTypes.bool.isRequired,
    }).isRequired
  })).isRequired
};


export default App;
