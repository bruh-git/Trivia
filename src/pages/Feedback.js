import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const MIN_CORRECT_ANSWERS = 3;

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          { score < MIN_CORRECT_ANSWERS ? 'Could be better...' : 'Well Done!' }
        </p>
        <p>
          O seu placar final é de
          {' '}
          <strong data-testid="feedback-total-score">{score}</strong>
        </p>
        <p>
          Você acertou
          {' '}
          <strong data-testid="feedback-total-question">{assertions}</strong>
          {' '}
          perguntas
        </p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  // setNewToken: (token) => dispatch(renewToken(token)),
  // dispatchRequestQuiz: () => dispatch(fetchQuizThunk()),
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  // token: PropTypes.string,
  // results: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
