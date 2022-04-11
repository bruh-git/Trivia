import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import categories from '../data';
import { saveConfig } from '../redux/actions';
import './Config.css';

class Config extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionsRange: '5',
      categoryChosen: 'Any',
      difficultyOption: 'Any',
      typeOption: 'Any',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  saveConfig = () => {
    const { questionsRange, categoryChosen, difficultyOption,
      typeOption } = this.state;
    const { dispatchSaveConfig } = this.props;
    function translateType() {
      return (typeOption === 'Multiple Choice' ? 'multiple' : 'boolean');
    }
    const modifier = 8;
    const configSet = {
      amount: questionsRange,
      category: categoryChosen !== 'Any'
        ? (categories.indexOf(categoryChosen) + modifier) : '',
      difficulty: difficultyOption !== 'Any'
        ? difficultyOption.toLocaleLowerCase() : '',
      type: typeOption !== 'Any'
        ? translateType()
        : '',
    };
    dispatchSaveConfig(configSet);
  }

  resetConfig = () => {
    this.setState({
      questionsRange: '5',
      categoryChosen: 'Any',
      difficultyOption: 'Any',
      typeOption: 'Any',
    });
  }

  render() {
    const { questionsRange, categoryChosen, difficultyOption, typeOption } = this.state;
    const difficultyList = ['Any', 'Easy', 'Medium', 'Hard'];
    const typeList = ['Any', 'Multiple Choice', 'True/False'];

    return (
      <form>
        <fieldset className="config-container">
          <legend
            data-testid="settings-title"
          >
            <h2>Configurations</h2>
          </legend>
          <div className="inner-container">
            <label htmlFor="questions-range">
              {' '}
              <h3>{`Number of questions: ${questionsRange || '5'}`}</h3>
              <input
                name="questionsRange"
                type="range"
                list="range-options"
                value={ questionsRange }
                min="5"
                max="50"
                step="5"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="categories">
              <h3>Categories</h3>
              <select
                id="categories"
                name="categoryChosen"
                value={ categoryChosen }
                onChange={ this.handleChange }
              >
                {
                  categories.map((category, index) => (
                    <option key={ index } name="categoryChosen" value={ category }>
                      {category}
                    </option>
                  ))
                }
              </select>
            </label>
            <label htmlFor="difficulty">
              <h3>Difficulty</h3>
              <select
                id="difficulty"
                name="difficultyOption"
                value={ difficultyOption }
                onChange={ this.handleChange }
              >
                {
                  difficultyList.map((difficulty, index) => (
                    <option key={ index } name="difficultyOption" value={ difficulty }>
                      {difficulty}
                    </option>
                  ))
                }
              </select>
            </label>
            <label htmlFor="type">
              <h3>Type of Question</h3>
              <select
                id="type"
                name="typeOption"
                value={ typeOption }
                onChange={ this.handleChange }
              >
                {
                  typeList.map((type, index) => (
                    <option key={ index } name="typeOption" value={ type }>
                      {type}
                    </option>
                  ))
                }
              </select>
            </label>
          </div>
        </fieldset>
        <div className="btn-container">
          <button
            className="config-btn"
            type="button"
            onClick={ this.saveConfig }
          >
            Save
          </button>
          <button
            className="config-btn"
            type="button"
            onClick={ this.resetConfig }
          >
            Default configuration
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveConfig: (config) => dispatch(saveConfig(config)),
});

Config.propTypes = {
  dispatchSaveConfig: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Config);
