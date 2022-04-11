import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import { fetchTokenThunk, userLoginData } from '../redux/actions';
import Config from '../components/Config';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isDisabled: true,
      name: '',
      openConfig: false,
    };
  }

  componentDidMount() {
    const { dispatchRequestToken } = this.props;
    dispatchRequestToken();
  }

  validate = () => {
    const { email, name } = this.state;
    const emailFormat = /\S+@\S+\.\S+/;
    const validEmail = emailFormat.test(email);
    return name && validEmail
      ? this.setState({ isDisabled: false })
      : this.setState({ isDisabled: true });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validate);
  }

  handleClick = () => {
    const { name, email } = this.state;
    const { saveUserData } = this.props;
    saveUserData(name, email);
  }

  render() {
    const { email, isDisabled, name, openConfig } = this.state;

    return (
      <>
        <div>
          <div>
            <header className="App-header">
              <img src={ logo } className="App-logo" alt="logo" />
              <p>
                SUA VEZ
              </p>
            </header>
          </div>
          <div className="App">
            <input
              className="input-form"
              data-testid="input-player-name"
              id="name"
              name="name"
              placeholder="nome"
              onChange={ this.handleChange }
              type="text"
              value={ name }
            />
            <input
              className="input-form"
              data-testid="input-gravatar-email"
              id="email"
              name="email"
              placeholder="email"
              onChange={ this.handleChange }
              type="email"
              value={ email }
            />
            <Link to="/game">
              <button
                className="btn"
                data-testid="btn-play"
                disabled={ isDisabled }
                onClick={ this.handleClick }
                type="button"
              >
                Play
              </button>
            </Link>
            <button
              className="btn"
              data-testid="btn-settings"
              onClick={ () => this.setState({ openConfig: !openConfig }) }
              type="button"
            >
              Configuração
            </button>
          </div>
        </div>
        <div>{ openConfig && <Config /> }</div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchRequestToken: (token) => dispatch(fetchTokenThunk(token)),
  saveUserData: (name, email) => dispatch(userLoginData(name, email)),
});

Login.propTypes = {
  dispatchRequestToken: PropTypes.func.isRequired,
  saveUserData: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
