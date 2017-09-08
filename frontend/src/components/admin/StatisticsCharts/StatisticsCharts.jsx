import React from 'react';
import Toggle from 'material-ui/Toggle';
import { BarChart, Bar, PieChart, Pie, XAxis, Tooltip, Legend, Cell } from 'recharts';
import randomColor from 'random-material-color';

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
      chartType: 'bar',
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
      let chart;
      if (this.state.chartType === 'bar') {
        chart = (
          <BarChart width={280} height={200} data={statisticsData.statValues}>
            <XAxis dataKey="name" />
            <Tooltip cursor={{ strokeWidth: 1, opacity: 0.3 }} />
            <Bar dataKey="value">
              {
                statisticsData.statValues.map(entry => (
                  <Cell key={entry} fill={randomColor.getColor()} />
                ))
              }
            </Bar>
          </BarChart>
        );
      } else {
        chart = (
          <PieChart width={280} height={200}>
            <Pie data={statisticsData.statValues} dataKey="value">
              {
                statisticsData.statValues.map(entry => (
                  <Cell fill={randomColor.getColor()} key={entry} />
                ))
              }
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      }
      return (
        <div key={i} style={{ margin: '10px 20px' }}>
          <h3 style={{ textAlign: 'center' }}>{chartName}</h3>
          {chart}
        </div>
      );
    }
    return undefined;
  }

  switchChartType(state) {
    this.setState({ chartType: state.chartType === 'bar' ? 'pie' : 'bar' });
  }

  render() {
    return (
      <div style={{ marginTop: 40, padding: '0 10px', float: 'right', width: this.props.width }}>
        {/* <h2 style={{ width: 400 }}>Charts</h2> */}
        <Toggle
          style={{ float: 'right', width: 190 }}
          label={`Switch to "${this.state.chartType === 'pie' ? 'bar' : 'pie'}" style`}
          onToggle={() => this.switchChartType(this.state)}
        />
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            flexShring: 0,
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
