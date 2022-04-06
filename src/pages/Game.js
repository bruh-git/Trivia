import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuizThunk } from '../redux/actions';
import Question from '../components/Question';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };
  }

  async componentDidMount() {
    const { dispatchRequestQuiz } = this.props;
    dispatchRequestQuiz();
  }

  renderQuestion = () => {
    const { index } = this.state;
    const { results } = this.props;
    // const answers = [...results[0].incorrect_answers, results[0].correct_answer];
    return (
      <div>
        <Question questionObject={ results[index] } />
      </div>
    );
  }

  render() {
    const { token, results } = this.props;

    return (
      // data-testid="question-category"
      // data-testid="question-text"
      // data-testid="correct-answer"
      // data-testid="wrong-answer-${index}"
      // data-testid="answer-options"
      <>
        <div><Header /></div>
        { token && results
          ? this.renderQuestion()
          : <p>Token está perdido por aí...</p>}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  results: state.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRequestQuiz: () => dispatch(fetchQuizThunk()),
});

Game.propTypes = {
  dispatchRequestQuiz: PropTypes.func,
  token: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
