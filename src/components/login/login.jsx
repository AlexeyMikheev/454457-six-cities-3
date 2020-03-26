import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import LoginForm from "../login-form/login-form.jsx";
import {getAuthError} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import withFormState from "../../hoks/with-form-state/with-form-state.jsx";

const LoginFormWithFormState = withFormState(LoginForm);

const Login = ({error, submitForm}) => {
  return (
    <React.Fragment>
      <Header />
      <div className="page page--gray page--login">
        <div className="page__login-container container">
          <section className="login">
            { error && <div className="login__error">{error}</div> }
            <h1 className="login__title">Sign in</h1>
            <LoginFormWithFormState onSubmitForm={submitForm}/>
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
};

Login.propTypes = {
  submitForm: PropTypes.func.isRequired,
  error: PropTypes.string
};

const mapStateToProps = (state) => ({
  error: getAuthError(state)
});

const mapDispatchToProps = {
  submitForm: UserOperation.login
};

export {Login};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
