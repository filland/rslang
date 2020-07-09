import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

class Loader extends React.Component {
  render() {
    const { isUserWordsLoading, isDictionaryWordsLoading } = this.props;
    let styles;
    if (isDictionaryWordsLoading || isUserWordsLoading) {
      styles = { display: 'block' };
    } else {
      styles = { display: 'none' };
    }
    return (
      <div className="loader main" style={styles}>
        <div className="spinner">
          <div class="spinner-cube">
              <div></div>
              <div></div>
          </div>
        </div>
      </div>
    );
  }
}

const isUserWordsLoading = (store) => store.userWords.isLoading;
const isDictionaryWordsLoading = (store) => store.dictionaryWords.isLoading;

const mapStateToProps = (store) => ({
  isUserWordsLoading: isUserWordsLoading(store),
  isDictionaryWordsLoading: isDictionaryWordsLoading(store),
});

export default connect(mapStateToProps, null)(Loader);
