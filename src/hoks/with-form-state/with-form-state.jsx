import React, {PureComponent} from 'react';
import {extendObject} from "../../utils.js";

const withFormState = (Component) => {
  class WithFormState extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        numeric: undefined,
        text: ``
      };

      this.onNumericChanged = this.onNumericChanged.bind(this);
      this.onTextChanged = this.onTextChanged.bind(this);
      this.onClearState = this.onClearState.bind(this);
    }

    get IsFormValid() {
      const {numeric, text} = this.state;
      return numeric !== undefined && text !== undefined && text.length > 50;
    }

    onNumericChanged(numeric) {
      this.setState(extendObject(this.state, {numeric}));
    }

    onTextChanged(text) {
      this.setState(extendObject(this.state, {text}));
    }

    onClearState() {
      this.setState({
        numeric: undefined,
        text: ``
      });
    }

    render() {
      const {numeric, text} = this.state;

      return <Component
        {...this.props}
        numeric={numeric}
        text={text}
        isFormValid={this.IsFormValid}
        onNumericChanged={this.onNumericChanged}
        onTextChanged={this.onTextChanged}
        onClearState={this.onClearState}
      />;
    }
  }

  return WithFormState;
};

export default withFormState;
