import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import Login from "../login/login.jsx";
import Property from "../property/property.jsx";
import {CityShape} from "../../settings.js";
import {getHasSelectedOffer, getCurrentCity} from "../../reducer/data/selectors.js";
import {isUserAuthorized} from "../../reducer/user/selectors.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderApp() {
    const {hasSelectedOffer, isAuthorized} = this.props;

    if (!isAuthorized) {
      return <Login />;
    }

    if (hasSelectedOffer) {
      return <Property />;
    }

    return <Main/>;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderApp()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  hasSelectedOffer: PropTypes.bool.isRequired,
  selectedCity: PropTypes.shape(CityShape),
  isAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  hasSelectedOffer: getHasSelectedOffer(state),
  selectedCity: getCurrentCity(state),
  isAuthorized: isUserAuthorized(state),
});

export {App};
export default connect(mapStateToProps)(App);
