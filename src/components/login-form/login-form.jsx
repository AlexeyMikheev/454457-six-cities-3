import React from "react";
import PropTypes from "prop-types";

export const LoginForm = ({onSubmit}) => {
  return (
    <form className="login__form form" action="" onSubmit={onSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden" htmlFor="email">E-mail</label>
        <input className="login__input form__input" type="email" name="email" id="email" placeholder="Email"/>
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden" htmlFor="password">Password</label>
        <input className="login__input form__input" type="password" name="password" id="password" placeholder="Password" />
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default React.memo(LoginForm);
