import React from 'react';
import { BarChart, Bar, XAxis, Tooltip } from 'recharts';

class StatisticsCharts extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFields: [],
      chartData: [
        { name: 'a', value: 35 },
        { name: 'b', value: 28 },
      ],
      chartsToShow: {
        os: 'OS',
        browser: 'Browser',
        browserLanguage: 'Language',
        country: 'Country',
        city: 'City',
        screenWidth: 'Screen Width',
        screenHeight: 'Screen Height',
        timeZone: 'Time Zone',
        deviceType: 'Device Type',
      },
      statisticsData: [],
    };
  }

  componentWillMount() {
    this.setState({ selectedFields: this.props.selectedFields });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedFields !== this.state.selectedFields) {
      this.setState({ selectedFields: nextProps.selectedFields });
    }
  }

  getAndAddStatisticsData(field) {
    // Checking if we already have statistics for this field
    let statistics = this.state.statisticsData.find(stat => stat.statName === field);
    if (statistics) return statistics;
    // If we don't, then we should add it to the state and return it
    statistics = { statName: field, statValues: [] };
    const statValues = {};
    this.props.statistics.forEach((stat) => {
      statValues[stat[field]] = statValues[stat[field]] ? statValues[stat[field]] += 1 : 1;
    });
    for (const stat in statValues) {
      statistics.statValues.push({ name: stat, value: statValues[stat] });
    }
    // this.setState({ statisticsData: [...this.state.statisticsData, statistics] });
    return statistics;
  }

  createChart(field, i) {
    // Checking if we should show chart by this field
    // and getting a normal name of the field
    const chartName = this.state.chartsToShow[field];
    if (chartName) {
      const statisticsData = this.getAndAddStatisticsData(field);
      return (
        <div key={i} style={{ width: '30%' }}>
          <h3>{chartName}</h3>
          {/* {console.log(statisticsData)} */}
          <BarChart width={300} height={200} data={statisticsData.statValues}>
            <XAxis dataKey="name" />
            <Tooltip cursor={{ strokeWidth: 1, opacity: 0.3 }} />
            <Bar dataKey="value" fill="grey" />
          </BarChart>
        </div>
      );
    }
    return undefined;
  }

  render() {
    return (
      <div style={{ marginTop: 50 }}>
        {/* <h2>Charts</h2> */}
        <div
          style={{
            width: '80%',
            float: 'right',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {
            this.state.selectedFields.map((field, i) => {
              return this.createChart(field, i);
            })
          }
        </div>
      </div>
    );
  }
}

export default StatisticsCharts;
