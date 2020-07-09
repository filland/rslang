import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

class Loader extends React.Component {
  render() {
    const { isSettingsLoading, isStatisticsLoading, isUserWordsLoading, isDictionaryWordsLoading } = this.props;
    let styles;
    if (isSettingsLoading || isDictionaryWordsLoading || isUserWordsLoading || isStatisticsLoading) {
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
const isSettingsLoading = (store) => store.settings.isLoading;
const isStatisticsLoading = (store) => store.statistics.isLoading;

const mapStateToProps = (store) => ({
  isUserWordsLoading: isUserWordsLoading(store),
  isDictionaryWordsLoading: isDictionaryWordsLoading(store),
  isSettingsLoading: isSettingsLoading(store),
  isStatisticsLoading: isStatisticsLoading(store),
});

export default connect(mapStateToProps, null)(Loader);
