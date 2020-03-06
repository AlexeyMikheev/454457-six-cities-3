import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {AuthStatus, AuthStatuses} from "../../consts.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";

const Header = ({authStatus}) => {
  const authInfo = authStatus === AuthStatus.AUTH ? `Oliver.conner@gmail.com` : `Sing in`;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link" xlinkHref="main.html">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" xlinkHref="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">{authInfo}</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authStatus: PropTypes.oneOf(AuthStatuses)
};

const mapStateToProps = (state) => ({
  authStatus: getAuthorizationStatus(state),
});

export {Header};
export default connect(mapStateToProps)(Header);
