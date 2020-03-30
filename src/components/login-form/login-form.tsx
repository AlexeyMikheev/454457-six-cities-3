import * as React from "react";
import {FormValueChangeFunction, FormSubmitFunction} from "../../types";

interface Props{
  onValueChanged: FormValueChangeFunction;
  onSubmitForm: FormSubmitFunction;
  email: string;
  password: string;
}

class LoginForm extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    this.submitFormHandler = this.submitFormHandler.bind(this);
  }

  submitFormHandler(evt) {
    evt.preventDefault();

    const {onSubmitForm, email, password} = this.props;

    onSubmitForm({login: email, password});
  }

  render() {
    const {email = ``, password = ``, onValueChanged} = this.props;
    return (
      <form className="login__form form" action="" onSubmit={this.submitFormHandler}>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden" htmlFor="email">E-mail</label>
          <input className="login__input form__input" type="email" name="email" id="email" placeholder="Email" value={email} onChange={onValueChanged}/>
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden" htmlFor="password">Password</label>
          <input className="login__input form__input" type="password" name="password" id="password" placeholder="Password" value={password} onChange={onValueChanged}/>
        </div>
        <button className="login__submit form__submit button" type="submit">Sign in</button>
      </form>
    );
  }
}

export default LoginForm;
