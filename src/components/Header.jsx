import MD5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveGravatar } from '../redux/actions';
import './Header.css';

class Header extends Component {
  componentDidMount() {
    const { email, dispatchGravatar } = this.props;
    const GRAVATAR_URL = `https://www.gravatar.com/avatar/${MD5(email).toString()}`;
    dispatchGravatar(GRAVATAR_URL);
  }

  render() {
    const { name, score, picture } = this.props;

    return (
      <div className="header">
        <div className="data-player-container">
          <img
            data-testid="header-profile-picture"
            src={ picture }
            alt="Avatar do usuário"
          />
          <p>
            Jogador:
            {' '}
            <span data-testid="header-player-name">{ name }</span>
          </p>
        </div>
        <p className="score-container">
          Pontos:
          {' '}
          <span data-testid="header-score">{ score }</span>
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  picture: state.player.picture,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGravatar: (picture) => dispatch(saveGravatar(picture)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
