import React, {PureComponent} from 'react';
import {extendObject} from "../utils.js";


const withBooleanState = (Component) => {
  class WithBooleanState extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isToggled: false,
      };
    }

    render() {
      const {isToggled} = this.state;

      const altIsToggled = !isToggled;

      return <Component
        {...this.props}
        isToggled={isToggled}
        onToggleChange = {
          () => {
            this.setState(extendObject(this.state, {isToggled: altIsToggled}));
          }}
      />;
    }
  }

  WithBooleanState.propTypes = {};

  return WithBooleanState;
};

export default withBooleanState;
