import React from 'react';
import { connect } from 'react-redux';
import { getData } from './redux/actions';
import Loader from '../common/loader/index';
import GamePage from './GamePage/GamePage';
import './style.scss';

class Savanna extends React.Component {
  componentDidMount() {
    this.props.getData(1, 1);
  }

  render() {
    return (
      <div className='savannaGame'>
        {this.props.data.length === 0
          ? <Loader />
          : <GamePage {...this.props} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.savannaGame,
});

const mapDispathToProps = {
  getData,
};

export default connect(mapStateToProps, mapDispathToProps)(Savanna);
