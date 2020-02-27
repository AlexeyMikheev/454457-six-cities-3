import React, {PureComponent} from 'react';
import {extendObject} from "../utils.js";


const withBooleanState = (Component) => {
  class WithBooleanState extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isOpened: false,
      };
    }

    render() {
      const {isOpened} = this.state;

      const altIsOpened = !isOpened;

      return <Component
        {...this.props}
        isOpened={isOpened}
        onToggleChange = {
          () => {
            this.setState(extendObject(this.state, {isOpened: altIsOpened}));
          }}
      />;
    }
  }

  WithBooleanState.propTypes = {};

  return WithBooleanState;
};

export default withBooleanState;
