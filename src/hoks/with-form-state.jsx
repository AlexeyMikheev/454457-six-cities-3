import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {isLoadingStatus, isSuccessStatus, getCommentError} from "../reducer/comment/selectors.js";
import {Operation as commentOperation} from "../reducer/comment/comment.js";
import {getCurrentOfferId} from "../reducer/data/selectors.js";
import {extendObject} from "../utils.js";


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
      this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidUpdate() {
      const {isSuccess, clearStatus} = this.props;
      if (isSuccess) {
        this.setState({
          numeric: undefined,
          text: ``
        });
        clearStatus();
      }
    }

    get IsFormValid() {
      const {numeric, text} = this.state;
      return numeric !== undefined && text !== undefined && text.length > 50;
    }

    get IsFormDisabled() {
      return this.IsLoading;
    }

    onNumericChanged(numeric) {
      this.setState(extendObject(this.state, {numeric}));
    }

    onTextChanged(text) {
      this.setState(extendObject(this.state, {text}));
    }

    onFormSubmit(evt) {
      evt.preventDefault();

      const {numeric: rating, text: comment} = this.state;
      const {sendComment, isLoading, offerId} = this.props;

      if (!this.IsFormValid || isLoading) {
        return;
      }

      sendComment(offerId, {rating, comment});
    }

    render() {
      const {numeric, text} = this.state;
      const {error} = this.props;

      return <Component
        {...this.props}
        numeric={numeric}
        text={text}
        error={error}
        disabled={this.IsFormDisabled}
        isFormValid={this.IsFormValid}
        onNumericChanged={this.onNumericChanged}
        onTextChanged={this.onTextChanged}
        onFormSubmit={this.onFormSubmit}
      />;
    }
  }

  WithFormState.propTypes = {
    error: PropTypes.string,
    offerId: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    isSuccess: PropTypes.bool.isRequired,
    sendComment: PropTypes.func.isRequired,
    clearStatus: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    error: getCommentError(state),
    isLoading: isLoadingStatus(state),
    isSuccess: isSuccessStatus(state),
    offerId: getCurrentOfferId(state)
  });

  const mapDispatchToProps = {
    sendComment: commentOperation.sendComment,
    clearStatus: commentOperation.clearStatus
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithFormState);
};

export default withFormState;
