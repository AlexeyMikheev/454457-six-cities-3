import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";
import {OfferShape} from "../../settings.js";
import offersMock from "../../mocks/offers.js";
import reviewsMock from "../../mocks/reviews.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.placeHeaderClickHandler = this.placeHeaderClickHandler.bind(this);

    this.state = {
      value: offersMock[0]
    };
  }

  placeHeaderClickHandler(offerId) {
    this.setState({selectedOfferId: offerId});
  }

  renderApp() {
    const {offers} = this.props;

    return (
      <Main offers={offers} onPlaceHeaderClick={this.placeHeaderClickHandler}/>
    );
  }

  renderOfferDetail() {
    const offer = this.state.value;

    if (offer !== null) {
      return (
        <OfferDetail offer={offer} reviews={reviewsMock} />
      );
    }
    return this.renderApp();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderApp()}
          </Route>
          <Route exact path="/dev-offer">
            {this.renderOfferDetail()}
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
