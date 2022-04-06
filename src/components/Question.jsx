import React from 'react';

class Question extends React.Component {
  render() { 
    const { questionObject } = this.props;
    const {
      category,
      type,
      question,
      correct_answer,
      incorrect_answers
    } = questionObject;

    return (
      <div>
        <p data-testid="question-category"> { category } </p>
        <p data-testid="question-text">{ question }</p>
        <ul>
          <li data-testid="correct-answer">{ correct_answer }</li>
          { incorrect_answers.map((answer, idx) => <li key={ idx }>{answer}</li>)}
        </ul>
        <p data-testid="answer-options"> {} </p>
        <p data-testid="question-category"> {} </p>
      </div>
    );
  }
}

export default Question;
