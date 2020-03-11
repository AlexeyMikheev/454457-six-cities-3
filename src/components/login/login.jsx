import React, {PureComponent, createRef} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import {getAuthError} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    const {error} = this.props;

    return (
      <React.Fragment>
        <Header />
        <div className="page page--gray page--login">
          <div className="page__login-container container">
            <section className="login">
              { error && <div className="login__error">{error}</div> }
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="" onSubmit={this.handleSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden" htmlFor="email">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" id="email" ref={this.loginRef} placeholder="Email"/>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden" htmlFor="password">Password</label>
                  <input className="login__input form__input" type="password" name="password" id="password" ref={this.passwordRef} placeholder="Password" />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" xlinkHref="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

const mapStateToProps = (state) => ({
  error: getAuthError(state)
});

const mapDispatchToProps = {
  onSubmit: UserOperation.login
};

export {Login};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
