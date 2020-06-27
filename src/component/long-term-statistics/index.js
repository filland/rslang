import React from 'react';
import { Line } from 'react-chartjs-2';

import './style.scss';

export default class LineStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.transformDate = this.transformDate.bind(this);
    this.chartData = this.chartData.bind(this);

    this.state = {
      learnedWords: 200,
      optional: {
        day1AllWords: 10,
        day1NewWords: 2,
        day1Date: 1593216000000,
        day2AllWords: 20,
        day2NewWords: 10,
        day2Date: 1593186963956,
        day3AllWords: 30,
        day3NewWords: 0,
        day3Date: 1593186963956,
        day4AllWords: 40,
        day4NewWords: 15,
        day4Date: 1593186963956,
        day5AllWords: 30,
        day5NewWords: 16,
        day5Date: 1593186963956,
        day6AllWords: 40,
        day6NewWords: 25,
        day6Date: 1593186963956,
        day7AllWords: 30,
        day7NewWords: 7,
        day7Date: 1593186963956,
        newWords: 70,
        oldWords: 130,
      },
    };
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
          <h3>Общая статистика за 7 дней:</h3>
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
          <div className="statistics-content">
            <div className="statistics-name">Процент новых слов от общего количества:</div>
            <div className="statistics-value">{(this.state.optional.newWords / this.state.learnedWords) * 100}%</div>
          </div>
          <div className="statistics-content">
            <div className="statistics-name">Процент старых слов от общего количества:</div>
            <div className="statistics-value">{(this.state.optional.oldWords / this.state.learnedWords) * 100}%</div>
          </div>
        </div>
      </div>
    );
  }
}
