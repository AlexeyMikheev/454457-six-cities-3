import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {UserInfo} from "../../types";
import {AppRoute} from "../../consts";
import {isUserAuthorized, getAuthInfo} from "../../reducer/user/selectors.js";

interface Props{
  isAuthorized: boolean;
  authInfo: UserInfo;
}

const Header: React.FC<Props> = ({isAuthorized, authInfo}) => {

  const userInfo = isAuthorized ? authInfo.email : `Sing in`;
  const link = isAuthorized ? AppRoute.FAVORITES : AppRoute.LOGIN;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.ROOT}>
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={link}>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">{userInfo}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  isAuthorized: isUserAuthorized(state),
  authInfo: getAuthInfo(state),
});

export {Header};
export default connect(mapStateToProps)(Header);
