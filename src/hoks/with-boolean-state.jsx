import React, {PureComponent} from 'react';

const withBooleanState = (Component) => {
  class WithBooleanState extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isToggled: false,
      };

      this.onToggleHandler = this.onToggleHandler.bind(this);
    }

    onToggleHandler() {
      const {isToggled} = this.state;

      this.setState({isToggled: !isToggled});
    }

    render() {
      const {isToggled} = this.state;

      return <Component
        {...this.props}
        isToggled={isToggled}
        onToggleChange = {this.onToggleHandler}
      />;
    }
  }

  WithBooleanState.propTypes = {};

  return WithBooleanState;
};

export default withBooleanState;
