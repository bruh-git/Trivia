import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MD5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;

    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${MD5(email).toString()}` }
          alt="Avatar do usuário"
        />
        <h3 data-testid="header-player-name">{ name }</h3>
        <span data-testid="header-score">{ score }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
