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
    const { dispatchTime } = this.props;
    const interval = 1000;

    const timeout = setTimeout(() => {
      const newTime = time - 1;
      this.setState({ time: newTime });
    }, interval);
    if (time === 0) {
      clearTimeout(timeout);
      dispatchTime();
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
};

export default connect(null, mapDispatchToProps)(Time);
