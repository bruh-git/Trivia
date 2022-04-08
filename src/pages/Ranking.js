import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <div data-testid="ranking-title">Ranking</div>
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

export default Ranking;
