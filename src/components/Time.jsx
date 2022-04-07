import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expiredTimeAction } from '../redux/actions';

class Time extends React.Component {
  constructor() {
    super();
    this.state = { time: 30 };
  }

  render() {
    const { time } = this.state;
    const { dispatchTime, getTimer } = this.props;
    const interval = 1000;
    const timeout = setTimeout(() => {
      const newTime = time - 1;
      getTimer(newTime);
      this.setState({ time: newTime });
    }, interval);
    if (time === 0) {
      dispatchTime();
      clearTimeout(timeout);
    }

    return (
      <p>{ time }</p>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchTime: () => dispatch(expiredTimeAction()),
});

Time.propTypes = {
  dispatchTime: PropTypes.func.isRequired,
  getTimer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Time);
