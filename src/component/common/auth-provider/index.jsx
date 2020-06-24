import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchData } from './service';
import { isLoading, isError } from './selectors';
import { isAuthorized } from '../../../common/utils/TokenUtils';

class AuthProvider extends Component {
  componentDidMount() {
    if (isAuthorized()) {
      console.log('AuthProvider is fetching data...');

      const { fetchData } = this.props;
      fetchData();

      console.log('AuthProvider fetched data.');
    }
  }

  componentWillMount() {
    if (!isAuthorized()) {
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

const mapStateToProps = (store) => ({
  isLoading: isLoading(store),
  isError: isError(store),
});

const mapDispatchToProps = {
  fetchData,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AuthProvider);
