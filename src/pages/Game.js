import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuizThunk, renewToken } from '../redux/actions';
import fetchAPI from '../services/fetchApi';

class Game extends Component {
  constructor() {
    super();

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
                <button
                  type="button"
                  data-testid="correct-answer"
                >
                  {currentQuestion.correct_answer}
                </button>
                {
                  currentQuestion.incorrect_answers
                    .map((answer, id) => (
                      <button
                        type="button"
                        data-testid="wrong-answer"
                        key={ id }
                      >
                        {answer}
                      </button>))
                }
              </ul>
            </div>)
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
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
