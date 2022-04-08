import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Time from '../components/Time';
import { fetchQuizThunk, renewToken, updateScore } from '../redux/actions';
import fetchAPI from '../services/fetchApi';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      results: [],
      responseTime: 0,
      answers: [],
      clicked: false,
      timer: 30,
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
    this.renderAnswers();
  }

  getTimer = (time) => this.setState({ responseTime: parseInt(time, 10) });

  handleClick = ({ target }) => {
    const { dispatchUpdateScore } = this.props;
    const { responseTime } = this.state;
    const correctAnswer = 'correct-answer';
    const incorrectAnswer = 'incorrect-answer';
    const answerList = target.parentNode.childNodes;
    const scoring = { hard: 3, medium: 2, easy: 1, base: 10 };
    const { difficulty } = target.dataset;
    answerList.forEach((answer) => {
      if (answer.dataset.testid === correctAnswer) {
        answer.className = correctAnswer;
      } else { answer.className = incorrectAnswer; }
    });
    if (target.dataset.testid === correctAnswer) {
      dispatchUpdateScore((scoring.base + (responseTime * scoring[difficulty])));
    }
    this.setState({ clicked: true });
  }

  renderAnswers = () => {
    const { index, results } = this.state;
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
    this.setState({ answers: shuffledAnwers, correctAnswer });
  }

  nextAnswer = () => {
    const { index } = this.state;
    const { history } = this.props;
    const idx = 4;
    if (index === idx) {
      history.push('/feedback');
    } else {
      this.setState({ index: index + 1, timer: 30, clicked: false });
      this.renderAnswers();
    }
  }

  renderButtonNext = () => (
    <button
      data-testid="btn-next"
      type="button"
      onClick={ this.nextAnswer }
    >
      Next

    </button>
  )

  setNewTimer = () => {
    const { timer } = this.state;
    const newTime = timer - 1;
    const interval = 500;
    setTimeout(() => {
      this.setState({ timer: newTime });
    }, interval);
  }

  render() {
    const { index, results, answers, correctAnswer, clicked, timer } = this.state;
    const { time } = this.props;
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
              <Time
                getTimer={ this.getTimer }
                timer={ timer }
                setNewTimer={ this.setNewTimer }
              />
              <ul data-testid="answer-options">
                {
                  answers
                  && answers.map((answer, id) => (
                    <button
                      data-testid={ answer === correctAnswer
                        ? 'correct-answer'
                        : `wrong-answer-${id}` }
                      data-difficulty={ currentQuestion.difficulty }
                      type="button"
                      disabled={ time }
                      key={ id }
                      onClick={ this.handleClick }
                    >
                      {answer}
                    </button>
                  ))
                }
              </ul>
            </div>
          )
        }
        {
          clicked ? this.renderButtonNext() : ''
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
  dispatchUpdateScore: (score) => dispatch(updateScore(score)),
});

Game.propTypes = {
  dispatchRequestQuiz: PropTypes.func,
  token: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
