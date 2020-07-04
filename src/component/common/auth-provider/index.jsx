import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchData } from './service';
import { isAuthorized } from '../../../common/utils/TokenUtils';

class AuthProvider extends Component {
  componentWillMount() {
    if (isAuthorized()) {
      const { fetchData } = this.props;
      fetchData();
    } else {
      const { history } = this.props;
      history.push('/login');
    }
  }

  render() {
    const { children } = this.props;
    return (<>
      {children}
    </>);
  }
}

const mapDispatchToProps = {
  fetchData,
};

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(AuthProvider);
