import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { expiredTimeAction } from '../redux/actions';

class Time extends React.Component {
  componentDidMount() {
    const { setNewTimer } = this.props;
    const ONE_SEC = 1000;
    this.timer = setInterval(setNewTimer, ONE_SEC);
  }

  componentDidUpdate() {
    const { timer } = this.props;
  }

  render() {
    const { dispatchTime, timer } = this.props;

    if (timer === 0) {
      dispatchTime();
    }

    return (
      <p>{ timer }</p>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchTime: () => dispatch(expiredTimeAction()),
});

Time.propTypes = {
  dispatchTime: PropTypes.func.isRequired,
  setNewTimer: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(Time);
