import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";
import {OfferShape} from "../../settings.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.placeHeaderClickHandler = this.placeHeaderClickHandler.bind(this);

    this.state = {selectedOfferId: undefined};
    this._offers = this.props.offers;
  }

  placeHeaderClickHandler(offerId) {
    this.setState({selectedOfferId: offerId});
  }

  renderApp() {
    return (
      <Main offers={this._offers} onPlaceHeaderClick={this.placeHeaderClickHandler}/>
    );
  }

  renderOfferDetail() {
    if (!this.state.selectedOfferId) {
      return ``;
    }

    const offer = this._offers.find((item) => {
      return item.id === this.state.selectedOfferId;
    });

    if (offer !== null) {
      return (
        <OfferDetail offer={offer} />
      );
    }
    return this.renderApp();
  }

  renderMain() {
    if (this.state.selectedOfferId) {
      return (
        this.renderOfferDetail()
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
            { this.renderMain() }
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
