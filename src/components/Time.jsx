import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { expiredTimeAction } from '../redux/actions';

class Time extends React.Component {
  render() {
    const { dispatchTime, timer, getTimer, setNewTimer } = this.props;
    const interval = 500;

    setTimeout(() => {
      getTimer(timer);
      setNewTimer();
    }, interval);

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
  getTimer: PropTypes.func.isRequired,
  setNewTimer: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(Time);
