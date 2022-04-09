import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const MIN_CORRECT_ANSWERS = 3;

class Feedback extends Component {
  componentDidMount() {
    const { picture, name, score } = this.props;
    const player = { name, picture, score };
    const rankingStorage = JSON.parse(localStorage.getItem('ranking')) || [];
    const storePlayers = [...rankingStorage, player];
    localStorage.setItem('ranking', JSON.stringify(storePlayers));
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          { assertions < MIN_CORRECT_ANSWERS ? 'Could be better...' : 'Well Done!' }
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
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ranking
          </button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  picture: state.player.picture,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
