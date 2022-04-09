import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
  }

  componentDidMount() {
    const players = JSON.parse(localStorage.getItem('ranking'));
    // const orderPlayers = players.sort((a, b) => (b.score - a.score));
    this.setState({ players });
  }

  render() {
    const { players } = this.state;
    return (
      <div>
        <div data-testid="ranking-title">Ranking</div>
        { players
        && players.map((player, index) => (
          <div key={ index }>
            <img src={ player.picture } alt="Gravatar do jogador" />
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </div>
        )).sort((a, b) => (a.score === b.score ? a.name - b.name
          : b.score - a.score))}
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            início
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

export default connect(mapStateToProps, null)(Ranking);
