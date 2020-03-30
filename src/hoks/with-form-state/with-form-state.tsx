import * as React from "react";
import {Subtract} from "utility-types";
import {FormValueChangeFunction, EmptyFunction, FormState} from "../../types";

 interface Props {
  onValueChanged: FormValueChangeFunction;
  onValuesReset: EmptyFunction;
 }

const initialState: FormState = {};

const withFormState = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, Props>;
  class WithFormState extends React.PureComponent<T, FormState> {
    constructor(props) {
      super(props);

      this.state = initialState;

      this.valueChangedHandler = this.valueChangedHandler.bind(this);
      this.valuesResetHandler = this.valuesResetHandler.bind(this);
    }

    valueChangedHandler(evt) {
      this.setState({[evt.target.name]: evt.target.value});
    }

    valuesResetHandler() {
      const cleanState = {};
      Object.keys(this.state).forEach((key) => {
        cleanState[key] = ``;
      });
      this.setState(cleanState);
    }

    render() {
      return <Component
        {...this.props}
        {...this.state}
        onValueChanged={this.valueChangedHandler}
        onValuesReset={this.valuesResetHandler}
      />;
    }
  }

  return WithFormState;
};

export default withFormState;
