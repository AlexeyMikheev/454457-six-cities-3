import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import LoginForm from "../login-form/login-form.jsx";
import {getAuthError} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    const form = new FormData(evt.target);
    const login = form.get(`email`);
    const password = form.get(`password`);

    onSubmit({
      login,
      password
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
              <LoginForm onSubmit={this.handleSubmit}/>
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
