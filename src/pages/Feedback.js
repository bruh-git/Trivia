import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const MIN_CORRECT_ANSWERS = 3;

class Feedback extends Component {
  render() {
    const { score } = this.props;
    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          { score < MIN_CORRECT_ANSWERS ? 'Could be better...' : 'Well Done!' }
        </p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  // setNewToken: (token) => dispatch(renewToken(token)),
  // dispatchRequestQuiz: () => dispatch(fetchQuizThunk()),
});

Feedback.propTypes = {
  score: PropTypes.number,
  // token: PropTypes.string,
  // results: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
