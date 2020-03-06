import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import Login from "../login/login.jsx";
import Property from "../property/property.jsx";
import {OfferShape, ReviewShape, CityShape} from "../../settings.js";
import {ActionCreator} from "../../reducer/data/data.js";
import {getCurrentOffer, getCurrentCity, getReviews} from "../../reducer/data/selectors.js";
import Header from "../header/header.jsx";
import {AuthStatus, AuthStatuses} from "../../consts.js";
import {getAuthStatus, getAuthError} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

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
      <React.Fragment>
        <Header />
        <div className="page page--gray page--main">
          <Main/>
        </div>
      </React.Fragment>
    );
  }

  renderLogin(login, authError) {
    return (
      <React.Fragment>
        <Header />
        <div className="page page--gray page--login">
          <Login onSubmit={login} error={authError}/>
        </div>
      </React.Fragment>
    );
  }

  renderProperty(selectedOffer) {
    if (!selectedOffer) {
      return null;
    }

    if (selectedOffer !== null) {
      return (
        <React.Fragment>
          <Header />
          <div className="page page--gray page--property">
            <Property />
          </div>
        </React.Fragment>
      );
    }
    return this.renderApp();
  }

  renderMain() {
    const {selectedOffer, authStatus, login, authError} = this.props;


    if (authStatus === AuthStatus.NO_AUTH) {
      return (
        this.renderLogin(login, authError)
      );
    } else if (selectedOffer) {
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
  selectedOffer: PropTypes.shape(OfferShape),
  selectedCity: PropTypes.shape(CityShape),
  reviews: PropTypes.arrayOf(PropTypes.shape(ReviewShape)),
  setCurrentOffer: PropTypes.func.isRequired,
  setCurrentCity: PropTypes.func.isRequired,
  authStatus: PropTypes.oneOf(AuthStatuses),
  login: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  selectedOffer: getCurrentOffer(state),
  selectedCity: getCurrentCity(state),
  reviews: getReviews(state),
  authStatus: getAuthStatus(state),
  authError: getAuthError(state)
});

const mapDispatchToProps = {
  setCurrentOffer: ActionCreator.setCurrentOffer,
  setCurrentCity: ActionCreator.setCurrentCity,
  login: UserOperation.login
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
