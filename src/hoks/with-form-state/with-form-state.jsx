import React, {PureComponent} from 'react';

const withFormState = (Component) => {
  class WithFormState extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {};

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
