import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import he from 'he';
import Header from '../components/Header';
import Time from '../components/Time';
import {
  fetchQuizThunk,
  renewToken,
  updateAssertions,
  updateScore,
  resetTime,
} from '../redux/actions';
import fetchAPI from '../services/fetchApi';

const CORRECT_ANSWER = 'correct-answer';
const INCORRECT_ANSWER = 'incorrect-answer';

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
    const { token, setNewToken, config } = this.props;
    let URL_QUIZ = `https://opentdb.com/api.php?token=${token}`;
    const filterConfig = Object.entries(config)
      .filter((param) => param[1] !== '');
    filterConfig.forEach((param) => { URL_QUIZ += `&${param[0]}=${param[1]}`; });
    console.log(URL_QUIZ);
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
    const { dispatchUpdateScore, dispatchUpdateAssertions } = this.props;
    const { responseTime, timer } = this.state;
    const answerList = target.parentNode.childNodes;
    const scoring = { hard: 3, medium: 2, easy: 1, base: 10 };
    const { difficulty } = target.dataset;
    answerList.forEach((answer) => {
      if (answer.dataset.testid === CORRECT_ANSWER) {
        answer.classList.add(CORRECT_ANSWER);
      } else { answer.classList.add(INCORRECT_ANSWER); }
    });
    if (target.dataset.testid === CORRECT_ANSWER) {
      dispatchUpdateAssertions();
      dispatchUpdateScore((scoring.base + (responseTime * scoring[difficulty])));
    }
    this.setState({ clicked: true });
    this.getTimer(timer);
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
    console.log('renderAnswer', index);
  }

  nextAnswer = () => {
    const answerButtons = document.querySelectorAll('.answer');
    console.log(answerButtons);
    answerButtons.forEach((answer) => answer
      .classList.remove(CORRECT_ANSWER, INCORRECT_ANSWER));
    const { index } = this.state;
    const { dispatchResetTime } = this.props;
    const { history } = this.props;
    const finalIndex = 4;
    if (index === finalIndex) {
      history.push('/feedback');
    } else {
      this.setState({
        index: index + 1,
        timer: 30,
        clicked: false }, () => this.renderAnswers());
      dispatchResetTime();
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
    this.setState({ timer: newTime });
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
              <h3 data-testid="question-text">{he.decode(currentQuestion.question)}</h3>
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
                      className="answer"
                      data-testid={ answer === correctAnswer
                        ? CORRECT_ANSWER
                        : `wrong-answer-${id}` }
                      data-difficulty={ currentQuestion.difficulty }
                      type="button"
                      disabled={ time }
                      key={ id }
                      onClick={ this.handleClick }
                    >
                      { he.decode(answer) }
                    </button>
                  ))
                }
              </ul>
            </div>
          )
        }
        {
          clicked || (timer === 0) ? this.renderButtonNext() : ''
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  time: state.time.time,
  config: state.config,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRequestQuiz: () => dispatch(fetchQuizThunk()),
  dispatchResetTime: () => dispatch(resetTime()),
  dispatchUpdateAssertions: () => dispatch(updateAssertions()),
  dispatchUpdateScore: (score) => dispatch(updateScore(score)),
  setNewToken: (token) => dispatch(renewToken(token)),
});

Game.propTypes = {
  dispatchRequestQuiz: PropTypes.func,
  token: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
