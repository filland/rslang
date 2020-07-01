import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import getUserStatistics from './service';

import './style.scss';

class LineStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.transformDate = this.transformDate.bind(this);
    this.chartData = this.chartData.bind(this);
    this.chartPieData = this.chartPieData.bind(this);

    this.state = {
      learnedWords: props.learnedWords,
      optional: props.optional,
    };
  }

  componentDidMount() {
    const { getUserStatistics } = this.props;
    getUserStatistics();
  }

  transformDate = (date) => {
    const correctDate = new Date(date).toLocaleDateString();
    return correctDate;
  }

  chartData = () => {
    const {
      day1AllWords,
      day1NewWords,
      day1Date,
      day2AllWords,
      day2NewWords,
      day2Date,
      day3AllWords,
      day3NewWords,
      day3Date,
      day4AllWords,
      day4NewWords,
      day4Date,
      day5AllWords,
      day5NewWords,
      day5Date,
      day6AllWords,
      day6NewWords,
      day6Date,
      day7AllWords,
      day7NewWords,
      day7Date,

    } = this.state.optional;

    const data = {
      labels: [
        this.transformDate(day1Date),
        this.transformDate(day2Date),
        this.transformDate(day3Date),
        this.transformDate(day4Date),
        this.transformDate(day5Date),
        this.transformDate(day6Date),
        this.transformDate(day7Date),
      ],
      datasets: [
        {
          label: 'Количество изученных слов за день',
          backgroundColor: 'rgba(75,192,192,0.4)',
          pointBorderColor: 'rgb(52, 141, 141)',
          pointHoverRadius: 5,
          data: [
            day1AllWords,
            day2AllWords,
            day3AllWords,
            day4AllWords,
            day5AllWords,
            day6AllWords,
            day7AllWords,
          ],
        },
        {
          label: 'Количество новых слов за день',
          backgroundColor: 'rgba(236, 67, 132,0.4)',
          pointBorderColor: 'rgb(236, 67, 132)',
          pointHoverRadius: 5,
          data: [
            day1NewWords,
            day2NewWords,
            day3NewWords,
            day4NewWords,
            day5NewWords,
            day6NewWords,
            day7NewWords,
          ],
        },
      ],
    };
    return data;
  }

  chartPieData = () => {
    const percentOfNewWords = (this.state.optional.newWords / this.state.learnedWords) * 100;
    const percentOfOldWords = (this.state.optional.oldWords / this.state.learnedWords) * 100;
    const data = {
      labels: [
        'Новые слова, %',
        'Старые слова, %',
      ],
      datasets: [{
        data: [percentOfNewWords, percentOfOldWords],
        backgroundColor: [
          '#77fa9e',
          '#f1f383',
        ],
        hoverBackgroundColor: [
          '#56f886',
          '#f6f86b',
        ],
      }],
    };
    return data;
  }

  render() {
    return (
      <div className='statisticsWrapper'>
        <div className='graph'>
          <h2>График эффективности обучения</h2>

          <Line
            data={this.chartData}
            options={{
              responsive: true,
            }} />
        </div>
        <div className='statistics-field'>
          <h3>Общая статистика за 7 дней</h3>
          <div className="statistics-content">
            <div className="statistics-name">Общее количество изученных слов:</div>
            <div className="statistics-value">{this.state.learnedWords}</div>
          </div>
          <div className="statistics-content">
            <div className="statistics-name">Новые слова:</div>
            <div className="statistics-value">{this.state.optional.newWords}</div>
          </div>
          <div className="statistics-content">
            <div className="statistics-name">Старые слова:</div>
            <div className="statistics-value">{this.state.optional.oldWords}</div>
          </div>
          <div className='graph-pie'>
            <h3>Процентное соотношение новых и старых слов</h3>
            <Pie data={this.chartPieData} />
          </div>
        </div>
      </div>
    );
  }
}
const isLoading = (store) => store.isLoading;
const getStatisticsTotalWords = (store) => store.statistics.learnedWords;
const getStatisticsOptional = (store) => store.statistics.optional;

const mapStateToProps = (store) => ({
  isLoading: isLoading(store),
  learnedWords: getStatisticsTotalWords(store),
  optional: getStatisticsOptional(store),
});

const mapDispatchToProps = {
  getUserStatistics,
};

export default connect(mapStateToProps, mapDispatchToProps)(LineStatistics);