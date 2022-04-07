import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuizThunk, renewToken } from '../redux/actions';
import fetchAPI from '../services/fetchApi';
import Time from '../components/Time';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      results: [],
    };
  }

  async componentDidMount() {
    const { token, setNewToken } = this.props;
    const URL_QUIZ = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const getQuiz = await fetchAPI(URL_QUIZ);
    const expiredResponseCode = 3;
    if (getQuiz.response_code === expiredResponseCode) {
      const RENEW_URL = 'https://opentdb.com/api_token.php?command=request';
      const newToken = await fetchAPI(RENEW_URL);
      setNewToken(newToken);
      const NEW_QUIZ_URL = `https://opentdb.com/api.php?amount=5&token=${newToken.token}`;
      const newRequestQuiz = await fetchAPI(NEW_QUIZ_URL);
      this.setState({ results: newRequestQuiz.results });
    } else { this.setState({ results: getQuiz.results }); }
  }

  handleClick = ({ target }) => {
    const correctAnswer = 'correct-answer';
    const incorrectAnswer = 'incorrect-answer';
    const answerList = target.parentNode.childNodes;
    answerList.forEach((answer) => {
      if (answer.dataset.testid === correctAnswer) {
        answer.className = correctAnswer;
      } else { answer.className = incorrectAnswer; }
    });
  }

  renderAnswers = () => {
    const { index, results } = this.state;
    const { time } = this.props;
    const currentQuestion = results[index];
    const { type } = currentQuestion;
    const incorrectAnswers = currentQuestion.incorrect_answers.concat();
    const correctAnswer = currentQuestion.correct_answer;
    const maxLength = 4;
    const minLength = 2;
    const answerLength = type === 'multiple' ? maxLength : minLength;
    const shuffledAnwers = incorrectAnswers.concat();
    shuffledAnwers
      .splice(Math.floor(Math.random() * answerLength), 0, correctAnswer);
    return shuffledAnwers
      .map((answer, id) => (
        <button
          data-testid={ answer === correctAnswer
            ? 'correct-answer'
            : `wrong-answer-${id}` }
          type="button"
          disabled={ time }
          key={ id }
          onClick={ this.handleClick }
        >
          {answer}
        </button>
      ));
  }

  render() {
    const { index, results } = this.state;
    const currentQuestion = results[index];

    return (
      <>
        <div><Header /></div>
        {
          results.length !== 0
          && (
            <div>
              <p data-testid="question-category">{currentQuestion.category}</p>
              <h3 data-testid="question-text">{currentQuestion.question}</h3>
              <ul data-testid="answer-options">
                <Time />
                { this.renderAnswers() }
              </ul>
            </div>
          )
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  time: state.time.time,
});

const mapDispatchToProps = (dispatch) => ({
  setNewToken: (token) => dispatch(renewToken(token)),
  dispatchRequestQuiz: () => dispatch(fetchQuizThunk()),
});

Game.propTypes = {
  dispatchRequestQuiz: PropTypes.func,
  token: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
