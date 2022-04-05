import React from 'react';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isDisabled: true,
      name: '',
    };
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

  render() {
    const { email, isDisabled, name } = this.state;

    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <p>
              SUA VEZ
            </p>
          </header>
        </div>
        <label htmlFor="name">
          Nome:
          {' '}
        </label>
        <input
          data-testid="input-player-name"
          id="name"
          name="name"
          onChange={ this.handleChange }
          type="text"
          value={ name }
        />
        <label htmlFor="email">
          E-mail:
          {' '}
        </label>
        <input
          data-testid="input-gravatar-email"
          id="email"
          name="email"
          onChange={ this.handleChange }
          type="email"
          value={ email }
        />
        <button
          data-testid="btn-play"
          disabled={ isDisabled }
          onClick={ this.handleClick }
          type="button"
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
