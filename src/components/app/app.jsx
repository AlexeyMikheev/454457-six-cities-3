import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import Login from "../login/login.jsx";
import Property from "../property/property.jsx";
import {OfferShape, CityShape} from "../../settings.js";
import {getCurrentOffer, getCurrentCity} from "../../reducer/data/selectors.js";
import Header from "../header/header.jsx";
import {isUserAuthorized, getAuthError} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
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
    const {selectedOffer, isAuthorized, login, authError} = this.props;


    if (!isAuthorized) {
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
  isAuthorized: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  authError: PropTypes.string
};

const mapStateToProps = (state) => ({
  selectedOffer: getCurrentOffer(state),
  selectedCity: getCurrentCity(state),
  isAuthorized: isUserAuthorized(state),
  authError: getAuthError(state)
});

const mapDispatchToProps = {
  login: UserOperation.login
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
