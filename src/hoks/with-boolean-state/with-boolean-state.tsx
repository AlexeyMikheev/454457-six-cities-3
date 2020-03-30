import * as React from "react";
import {Subtract} from "utility-types";
import {BooleanState} from "../../types";

interface Props{
  isToggled: boolean;
}

const initialState: BooleanState = {
  isToggled: false
};

const withBooleanState = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, Props>;
  class WithBooleanState extends React.PureComponent<T, Props> {
    constructor(props) {
      super(props);

      this.state = initialState;

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

  return WithBooleanState;
};

export default withBooleanState;
